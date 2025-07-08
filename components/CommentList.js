import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <div>댓글 없음</div>;

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <h1>{comment.content}</h1>
          <h2>
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </h2>
        </li>
      ))}
    </ul>
  );
}
