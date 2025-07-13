import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import formatDate from "@/lib/formatDate";
import axios from "@/lib/axios";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/[id].module.css";
import EditDropDownButton from "@/components/EditDropDownButton";
import { useRouter } from "next/router";
import DeleteModal from "@/components/DeleteModal";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";

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
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();

  function handleEdit() {
    router.push(`/articles/edit/${article.id}`);
  }

  function handleDeleteModal() {
    setDeleteModalOpen(true);
  }

  async function doDelete() {
    try {
      await axios.delete(`/article/${article.id}`);
      setToastMsg("삭제되었습니다.");
      router.push("/articles");
    } catch (e) {
      setModalMsg("삭제에 실패했습니다.");
      setModalOpen(true);
    }
  }

  async function fetchComments() {
    try {
      const res = await axios.get(`/article/${article.id}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch {
      setComments([]);
    }
  }

  return (
    <div className={styles.area}>
      <div className={styles.textBox}>
        <div className={styles.titleBox}>
          <span className={styles.title}>{article.title}</span>
          <EditDropDownButton
            onEdit={handleEdit}
            onDelete={handleDeleteModal}
          />
        </div>
        <div className={styles.etcBox}>
          <div className={styles.userBox}>
            <div className={styles.userIc} />
            <span className={styles.name}>작성자닉네임</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <div className={styles.likeBox}>
            <div className={styles.likeImg} />
            <span className={styles.likeNum}>9999+</span>
          </div>
        </div>
      </div>
      <span className={styles.text}>{article.content}</span>
      <div>
        <CommentInput articleId={article.id} onAdd={fetchComments} />
      </div>
      <div>
        <CommentList comments={comments} onRefresh={fetchComments} />
      </div>
      <Link className={styles.btn} href="/articles">
        목록으로 돌아가기
        <span className={styles.img} />
      </Link>
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
      <DeleteModal
        open={deleteModalOpen}
        message="게시글을 삭제하시겠습니까?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  );
}
