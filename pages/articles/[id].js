import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import DeleteModal from "@/components/DeleteModal";
import EditDropDownButton from "@/components/EditDropDownButton";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import { useAuth } from "@/contexts/AuthContext";
import axios from "@/lib/axios";
import formatDate from "@/lib/formatDate";
import styles from "@/styles/article[id].module.css";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function fetchArticle(id) {
  const res = await axios.get(`/articles/${id}`);
  return res.data;
}
async function fetchComments(id) {
  const res = await axios.get(`/articles/${id}/comments`, {
    params: { limit: 10 },
  });
  return Array.isArray(res.data.list) ? res.data.list : [];
}

export default function Article() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  const { data: article, isLoading: loadingA } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
    enabled: !!id,
  });

  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  if (loadingA) return <div>로딩 중...</div>;
  if (!article) return <div>해당 게시글이 없습니다.</div>;

  const isOwner = user && article.writer && user.id === article.writer.id;

  return (
    <div className={styles.area}>
      <div className={styles.textBox}>
        <div className={styles.titleBox}>
          <span className={styles.title}>{article.title}</span>
          {isOwner && (
            <EditDropDownButton
              onEdit={handleEdit}
              onDelete={handleDeleteModal}
            />
          )}
        </div>
        <div className={styles.etcBox}>
          <div className={styles.userBox}>
            <div className={styles.userIc} />
            <span className={styles.name}>{article.writer?.nickname}</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <div className={styles.likeBox}>
            <div className={styles.likeImg} />
            <span className={styles.likeNum}>{article.likeCount}</span>
          </div>
        </div>
      </div>
      <span className={styles.text}>{article.content}</span>
      <div>
        <CommentInput
          articleId={article.id}
          onAdd={refetchComments}
          label="댓글달기"
          placeholder="댓글을 입력해주세요."
        />
      </div>
      <div>
        <CommentList
          comments={comments}
          onRefresh={refetchComments}
          setToastMsg={setToastMsg}
          user={user}
          type="article"
        />
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
        message="정말로 게시글을 삭제하시겠어요?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  );
}
