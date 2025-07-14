import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import styles from "./PostArticle.module.css";
import { useRouter } from "next/router";
import Toast from "./Toast";
import Modal from "./Modal";

const TITLE_MAX = 30;
const CONTENT_MAX = 1000;

export default function PostArticle({ article }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTitle(article?.title || "");
    setContent(article?.content || "");
  }, [article]);

  useEffect(() => {
    if (title.trim().length > TITLE_MAX) {
      setTitleError(`제목은 ${TITLE_MAX}자까지 입력 가능합니다.`);
    } else {
      setTitleError("");
    }
  }, [title]);

  useEffect(() => {
    if (content.trim().length > CONTENT_MAX) {
      setContentError(`내용은 ${CONTENT_MAX}자까지 입력 가능합니다.`);
    } else {
      setContentError("");
    }
  }, [content]);

  const isFormValid =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    !titleError &&
    !contentError &&
    !loading;

  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      if (article) {
        await axios.patch(`/article/${article.id}`, { title, content });
        setToastMsg("게시글 수정 완료");
        setTimeout(() => router.push(`/articles/${article.id}`), 1200);
      } else {
        const res = await axios.post("/article", { title, content });
        setToastMsg("게시글 등록 완료");
        const newId = res.data.id;
        setTimeout(() => router.push(`/articles/${newId}`), 1200);
      }
    } catch (err) {
      setModalMsg(article ? "게시글 수정 실패" : "게시글 등록 실패");
      setModalOpen(true);
      console.error("에러:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.area}>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>
            {article ? "게시글 수정" : "게시글 작성"}
          </h1>
          <button
            className={`${styles.btn} ${isFormValid ? styles.active : ""}`}
            type="submit"
            disabled={!isFormValid}
          >
            {loading
              ? article
                ? "수정중"
                : "등록중"
              : article
              ? "수정"
              : "등록"}
          </button>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelArea}>
            <label className={styles.label}>제목</label>
            <span
              className={`${styles.length} ${titleError ? styles.error : ""}`}
            >
              {title.trim().length} / {TITLE_MAX}
            </span>
          </div>
          <input
            className={`${styles.input} ${titleError ? styles.error : ""}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            placeholder="제목을 입력해주세요"
          />
          {titleError && <div className={styles.errorText}>{titleError}</div>}
          <div className={styles.labelArea}>
            <label className={styles.label}>내용</label>
            <span
              className={`${styles.length} ${contentError ? styles.error : ""}`}
            >
              {content.trim().length} / {CONTENT_MAX}
            </span>
          </div>
          <textarea
            className={`${styles.textArea} ${contentError ? styles.error : ""}`}
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
            placeholder="내용을 입력해주세요"
          />
          {contentError && (
            <div className={styles.errorText}>{contentError}</div>
          )}
        </div>
      </form>
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
