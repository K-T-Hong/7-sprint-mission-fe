import EditDropDownButton from "@/components/EditDropDownButton";
import axios from "@/lib/axios";
import formatDate from "@/lib/formatDate";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/item[id].module.css";
import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import Link from "next/link";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/DeleteModal";

export const getServerSideProps = async context => {
  const productId = context.params["id"];

  let item;
  try {
    const res = await axios.get(`/products/${productId}`);
    item = res.data;
  } catch {
    return {
      notFound: true,
    };
  }
  let comments = [];
  try {
    const res = await axios.get(`/products/${productId}/comments`);
    comments = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    comments = [];
  }
  return { props: { item, comments } };
};

export default function Item({ item, comments: serverComments }) {
  const [comments, setComments] = useState(serverComments);
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();

  function handleEdit() {
    router.push(`/items/edit/${item.id}`);
  }

  function handleDeleteModal() {
    setDeleteModalOpen(true);
  }

  async function doDelete() {
    try {
      await axios.delete(`/products/${item.id}`);
      setToastMsg("삭제되었습니다.");
      router.push("/items");
    } catch (e) {
      setModalMsg("삭제에 실패했습니다.");
      setModalOpen(true);
    }
  }

  async function fetchComments() {
    try {
      const res = await axios.get(`/products/${item.id}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch {
      setComments([]);
    }
  }

  return (
    <div className={styles.area}>
      <div className={styles.mainBox}>
        <div className={styles.itemImg} />
        <div className={styles.box}>
          <div className={styles.textBox}>
            <div className={styles.titleBox}>
              <div className={styles.titleLine}>
                <span className={styles.title}>{item.name}</span>
                <EditDropDownButton
                  onEdit={handleEdit}
                  onDelete={handleDeleteModal}
                />
              </div>
              <span className={styles.price}>
                {Number(item.price).toLocaleString()}원
              </span>
            </div>
            <div className={styles.inforBox}>
              <span className={styles.subTitle}>상품 소개</span>
              <span className={styles.desc}>{item.description}</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.subTitle}>상품 태그</span>
              <div className={styles.tagArea}>
                {Array.isArray(item.tags) && item.tags.length > 0 ? (
                  item.tags.map((tag, idx) => (
                    <span className={styles.tag} key={idx}>
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className={styles.tag}>태그 없음</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.userInfor}>
            <div className={styles.userBox}>
              <div className={styles.userIc} />
              <div className={styles.userText}>
                <span className={styles.userName}>총명한 판다</span>
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <div className={styles.like}>
              <div className={styles.likeImg} />
              <span className={styles.likeNum}>123</span>
            </div>
          </div>
        </div>
      </div>
      <CommentInput
        itemId={item.id}
        onAdd={fetchComments}
        label="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <CommentList comments={comments} onRefresh={fetchComments} type="item" />
      <Link className={styles.btn} href="/items">
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
