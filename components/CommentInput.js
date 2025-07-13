import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import styles from "./CommentInput.module.css";
import Toast from "./Toast";
import Modal from "./Modal";

const COMMENT_MAX = 200;

export default function CommentInput({ articleId, onAdd }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    if (comment.length > COMMENT_MAX) {
      setCommentError("댓글은 최대 200글자까지 입력 가능합니다.");
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
      await axios.post(`/article/${articleId}/comments`, { content: comment });
      setToastMsg("댓글 등록");
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
          <label className={styles.label}>댓글달기</label>
          <span
            className={`${styles.length} ${commentError ? styles.error : ""}`}
          >
            {comment.length} / {COMMENT_MAX}
          </span>
        </div>
        <textarea
          className={`${styles.textArea} ${commentError ? styles.error : ""}`}
          value={comment}
          onChange={e => setComment(e.target.value)}
          disabled={loading}
          placeholder="댓글을 입력해주세요."
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
