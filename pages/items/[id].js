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
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

async function fetchItem(id) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}
async function fetchComments(id) {
  const res = await axios.get(`/products/${id}/comments`);
  return Array.isArray(res.data) ? res.data : [];
}

export default function Item() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, isLoading: loadingI } = useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
    enabled: !!id,
  });

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["itemComments", id],
    queryFn: () => fetchComments(id),
    enabled: !!id,
  });

  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
  if (loadingI || !item) return <div>로딩 중...</div>;

  return (
    <div className={styles.area}>
      <div className={styles.mainBox}>
        <div className={styles.imgArea}>
          <Image
            src={
              item.images && item.images.length > 0
                ? item.images[0]
                : "/img_default.svg"
            }
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:600px) 100vw, 221px"
            priority
          />
        </div>
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
                <span className={styles.userName}>{item.ownerNickname}</span>
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <div className={styles.like}>
              <div className={styles.likeImg} />
              <span className={styles.likeNum}>{item.favoriteCount}</span>
            </div>
          </div>
        </div>
      </div>
      <CommentInput
        itemId={item.id}
        onAdd={refetchComments}
        label="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <CommentList
        comments={comments}
        onRefresh={refetchComments}
        type="item"
      />
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
        message="정말로 상품을 삭제하시겠어요?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={doDelete}
      />
    </div>
  );
}
