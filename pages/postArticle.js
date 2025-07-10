import axios from "@/lib/axios";
import { useState } from "react";

export default function PostArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
      await axios.post("/article", { title, content });
      alert("게시글이 등록되었습니다.");
      window.location.href = "/board";
    } catch (err) {
      alert("게시글 등록 실패");
      console.error("게시글 등록실패:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ marginTop: 68 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>게시글 쓰기</h1>
          <button type="submit" disabled={loading}>
            {loading ? "등록중..." : "등록"}
          </button>
        </div>
        <div>
          <label>제목</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            placeholder="제목을 입력해주세요"
          />
          <label>내용</label>
          <textarea
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
