import axios from "@/lib/axios";
import { useState } from "react";

export default function CommentInput({ articleId, onAdd }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/article/${articleId}/comments`, { content });
      setContent("");
      if (onAdd) onAdd();
    } catch (err) {
      console.error("댓글 등록 실패:", err.response?.data || err.message);
      alert("댓글 등록 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>댓글달기</label>
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
        placeholder="댓글을 입력해주세요."
      />
      <button type="submit" disabled={loading}>
        {loading ? "등록중.." : "등록"}
      </button>
    </form>
  );
}
