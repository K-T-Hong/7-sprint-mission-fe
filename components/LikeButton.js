import React, { useState } from "react";
import axios from "@/lib/axios";
import styles from "./LikeButton.module.css";
import { useAuth } from "@/contexts/AuthContext";

export default function LikeButton({
  type,
  id,
  liked,
  count,
  onError,
  disabled,
}) {
  const [pending, setPending] = useState(false);
  const [localLiked, setLocalLiked] = useState(liked);
  const [localCount, setLocalCount] = useState(count);
  const { refetchUser } = useAuth();

  React.useEffect(() => {
    setLocalLiked(liked);
    setLocalCount(count);
  }, [liked, count]);

  async function handleClick() {
    if (pending || disabled) return;

    const optimisticLiked = !localLiked;
    const optimisticCount = localCount + (optimisticLiked ? 1 : -1);
    setLocalLiked(optimisticLiked);
    setLocalCount(optimisticCount);
    setPending(true);

    try {
      if (type === "article") {
        if (!localLiked) {
          await axios.post(`/articles/${id}/like`);
        } else {
          await axios.delete(`/articles/${id}/like`);
        }
      } else {
        if (!localLiked) {
          await axios.post(`/products/${id}/favorite`);
        } else {
          await axios.delete(`/products/${id}/favorite`);
        }
      }
      if (typeof refetchUser === "function") refetchUser();
    } catch (e) {
      setLocalLiked(localLiked);
      setLocalCount(localCount);
      onError && onError(e);
    }
    setPending(false);
  }

  return (
    <button
      type="button"
      className={`${styles.likeBox} ${localLiked ? styles.liked : ""}`}
      onClick={handleClick}
      disabled={pending || disabled}
      aria-label={localLiked ? "좋아요 취소" : "좋아요"}
    >
      <div className={styles.likeImg} />
      <span className={styles.likeNum}>{localCount}</span>
    </button>
  );
}
