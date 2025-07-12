import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "./CommentList.module.css";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0)
    return (
      <div className={styles.emptyArea}>
        <div className={styles.emptyImg} />
        <span className={styles.emptyText}>
          아직 댓글이 없어요.
          <br />
          지금 댓글을 달아보세요!
        </span>
      </div>
    );

  return (
    <ul>
      {comments.map(comment => (
        <li className={styles.area} key={comment.id}>
          <div className={styles.textBox}>
            <span className={styles.text}>{comment.content}</span>
            <span>수정삭제옵션</span>
          </div>
          <div className={styles.userBox}>
            <div className={styles.userIc} />
            <div className={styles.nameBox}>
              <span className={styles.name}>작성자닉네임</span>
              <span className={styles.date}>
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
