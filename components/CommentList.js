import axios from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "./CommentList.module.css";
import EditDropDownButton from "./EditDropDownButton";
import { useState } from "react";
import Toast from "./Toast";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";

export default function CommentList({ comments, onRefresh }) {
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetComment, setTargetComment] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [editError, setEditError] = useState("");

  function handleEditStart(comment) {
    setEditingId(comment.id);
    setEditingValue(comment.content);
    setEditError("");
  }

  function handleEditCancel() {
    setEditingId(null);
    setEditingValue("");
    setEditError("");
  }

  async function handleEditSave(comment) {
    if (!editingValue.trim()) {
      setEditError("댓글 내용을 입력해주세요.");
      return;
    }
    if (editingValue.length > 200) {
      setEditError("댓글은 200자 이내로 입력 가능합니다.");
      return;
    }
    try {
      await axios.patch(`/comments/${comment.id}`, { content: editingValue });
      setToastMsg("댓글이 수정되었습니다.");
      setEditingId(null);
      setEditingValue("");
      setEditError("");
      if (typeof onRefresh === "function") onRefresh();
    } catch (e) {
      setEditError("댓글 수정 실패");
      console.error("댓글 수정 실패:", e.response?.data || e.message);
    }
  }

  function handleDeleteModal(comment) {
    setTargetComment(comment);
    setDeleteModalOpen(true);
  }

  async function doDelete(comment) {
    try {
      await axios.delete(`/comments/${comment.id}`);
      setToastMsg("댓글이 삭제되었습니다.");
      if (typeof onRefresh === "function") onRefresh();
    } catch (e) {
      setModalMsg("댓글 삭제 실패");
      setModalOpen(true);
      console.error("댓글 삭제 실패:", e.response?.data || e.message);
    }
  }

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
    <>
      <ul>
        {comments.map(comment => (
          <li className={styles.area} key={comment.id}>
            <div className={styles.textBox}>
              {editingId === comment.id ? (
                <>
                  <textarea
                    className={styles.textArea}
                    value={editingValue}
                    onChange={e => setEditingValue(e.target.value)}
                    maxLength={200}
                  />
                  <div className={styles.length}>
                    {editingValue.length} / 200
                  </div>
                  {editError && <div className={styles.error}>{editError}</div>}
                  <div className={styles.btnArea}>
                    <button
                      onClick={handleEditCancel}
                      className={styles.cancel}
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleEditSave(comment)}
                      className={styles.save}
                    >
                      저장
                    </button>
                  </div>
                </>
              ) : (
                // ★ 평소에는 댓글+드롭다운 버튼
                <>
                  <span className={styles.text}>{comment.content}</span>
                  <EditDropDownButton
                    onEdit={() => handleEditStart(comment)}
                    onDelete={() => handleDeleteModal(comment)}
                  />
                </>
              )}
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
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
      <DeleteModal
        open={deleteModalOpen}
        message="댓글을 삭제하시겠습니까?"
        onCancel={() => {
          setDeleteModalOpen(false);
          setTargetComment(null);
        }}
        onConfirm={() => {
          if (targetComment) doDelete(targetComment);
          setDeleteModalOpen(false);
          setTargetComment(null);
        }}
      />
    </>
  );
}
