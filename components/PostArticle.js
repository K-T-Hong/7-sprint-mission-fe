import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import styles from "./PostArticle.module.css";
import { useRouter } from "next/router";

export default function PostArticle({ article }) {
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      if (article) {
        await axios.patch(`/article/${article.id}`, { title, content });
        alert("게시글이 수정되었습니다.");
        router.push(`/articles/${article.id}`);
      } else {
        const res = await axios.post("/article", { title, content });
        alert("게시글이 등록되었습니다.");
        const newId = res.data.id;
        router.push(`/articles/${newId}`);
      }
    } catch (err) {
      alert(article ? "게시글 수정 실패" : "게시글 등록 실패");
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
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading
              ? article
                ? "수정중..."
                : "등록중..."
              : article
              ? "수정"
              : "등록"}
          </button>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>제목</label>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            placeholder="제목을 입력해주세요"
          />
          <label className={styles.label}>내용</label>
          <textarea
            className={styles.textArea}
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
            placeholder="내용을 입력해주세요"
          />
        </div>
      </form>
    </div>
  );
}
