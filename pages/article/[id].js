import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import formatDate from "@/lib/formatDate";
import axios from "@/lib/axios";
import { useState } from "react";
import Link from "next/link";

export const getServerSideProps = async context => {
  const articleId = context.params["id"];

  let article;
  try {
    const res = await axios.get(`/article/${articleId}`);
    article = res.data;
  } catch {
    return {
      notFound: true,
    };
  }
  let comments = [];
  try {
    const res = await axios.get(`/article/${articleId}/comments`);
    comments = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    comments = [];
  }

  return { props: { article, comments } };
};

export default function Article({ article, comments: serverComments }) {
  const [comments, setComments] = useState(serverComments);

  async function fetchComments() {
    try {
      const res = await axios.get(`/article/${articleId}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch {
      setComments([]);
    }
  }

  return (
    <div>
      <div style={{ marginTop: 68 }}>
        <span>{article.title}</span>
        <span>{formatDate(article.createdAt)}</span>
        <h2>{article.content}</h2>
      </div>
      <div>
        <CommentInput articleId={article.id} onAdd={fetchComments} />
      </div>
      <div>
        <CommentList comments={comments} />
      </div>
      <Link href="/board">목록으로 돌아가기</Link>
    </div>
  );
}
