import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import styles from "./CommentInput.module.css";
import Toast from "./Toast";
import Modal from "./Modal";

const COMMENT_MAX = 200;

export default function CommentInput({
  articleId,
  itemId,
  onAdd,
  label,
  placeholder,
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    if (comment.trim().length > COMMENT_MAX) {
      setCommentError(`댓글은 ${COMMENT_MAX}자까지 입력 가능합니다.`);
    } else {
      setCommentError("");
    }
  }, [comment]);

  const isFormValid = comment.trim().length > 0 && !commentError && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      if (articleId) {
        await axios.post(`/articles/${articleId}/comments`, {
          content: comment,
        });
        setToastMsg("댓글이 등록되었습니다.");
      } else if (itemId) {
        await axios.post(`/products/${itemId}/comments`, { content: comment });
        setToastMsg("문의가 등록되었습니다.");
      } else {
        setModalMsg("대상 아이디가 없습니다.");
        setModalOpen(true);
        setLoading(false);
        return;
      }
      setComment("");
      if (onAdd) onAdd();
    } catch (err) {
      setModalMsg("댓글 등록 실패");
      setModalOpen(true);
      console.error("댓글 등록 실패:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.area}>
        <div className={styles.labelArea}>
          <label className={styles.label}>{label}</label>
          <span
            className={`${styles.length} ${commentError ? styles.error : ""}`}
          >
            {comment.trim().length} / {COMMENT_MAX}
          </span>
        </div>
        <textarea
          className={`${styles.textArea} ${commentError ? styles.error : ""}`}
          value={comment}
          onChange={e => setComment(e.target.value)}
          disabled={loading}
          placeholder={placeholder}
        />
        {commentError && <div className={styles.errorText}>{commentError}</div>}
        <div className={styles.btnArea}>
          <button
            className={`${styles.btn} ${isFormValid ? styles.active : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "등록중" : "등록"}
          </button>
        </div>
      </div>
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </form>
  );
}
