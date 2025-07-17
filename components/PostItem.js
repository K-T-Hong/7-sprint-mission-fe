import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./PostItem.module.css";
import axios from "@/lib/axios";
import Toast from "./Toast";
import Modal from "./Modal";
import { useTagBox } from "@/hooks/useTagBox";

const NAME_MAX = 30;
const DESC_MIN = 10;
const DESC_MAX = 1000;

export default function PostItem({ item }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [tagError, setTagError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const router = useRouter();

  const {
    tagInput,
    tags,
    tagInputChange,
    tagInputKeyDown,
    removeTagBox,
    tagInputError,
  } = useTagBox(item?.tags || []);

  useEffect(() => {
    setName(item?.name || "");
    setDescription(item?.description || "");
    setPrice(item?.price?.toString() || "");
  }, [item]);

  useEffect(() => {
    if (name.trim().length > NAME_MAX) {
      setNameError(`제목은 ${NAME_MAX}자까지 입력 가능합니다.`);
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (description.trim().length < DESC_MIN) {
      setDescError(`내용은 ${DESC_MIN}자 이상 입력해야 합니다.`);
    } else if (description.trim().length > DESC_MAX) {
      setDescError(`내용은 ${DESC_MAX}자까지 입력 가능합니다.`);
    } else {
      setDescError("");
    }
  }, [description]);

  useEffect(() => {
    if (price.trim() === "") {
      setPriceError("필수 입력 항목입니다.");
    } else if (isNaN(price)) {
      setPriceError("숫자만 입력 가능합니다.");
    } else {
      setPriceError("");
    }
  }, [price]);

  const isFormValid =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    price.trim().length > 0 &&
    !nameError &&
    !descError &&
    !priceError &&
    !tagInputError &&
    !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      if (item) {
        await axios.patch(`/products/${item.id}`, {
          name,
          description,
          price,
          tags,
        });
        setToastMsg("상품 수정 완료");
        setTimeout(() => router.push(`/items/${item.id}`), 1000);
      } else {
        const res = await axios.post("/products", {
          name,
          description,
          price,
          tags,
        });
        setToastMsg("상품 등록 완료");
        const newId = res.data.id;
        setTimeout(() => router.push(`/items/${newId}`), 1000);
      }
    } catch (err) {
      setModalMsg(item ? "상품 수정 실패" : "상품 등록 실패");
      setModalOpen(true);
      console.error("에러:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.formArea}>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>상품 {item ? "수정" : "등록"}하기</h1>
          <button
            className={`${styles.btn} ${isFormValid ? styles.active : ""}`}
            type="submit"
            disabled={!isFormValid}
          >
            {loading ? (item ? "수정중" : "등록중") : item ? "수정" : "등록"}
          </button>
        </div>
        <div className={styles.inputArea}>
          <div className={styles.inputBox}>
            <div className={styles.labelArea}>
              <label className={styles.label}>상품명</label>
              <span
                className={`${styles.length} ${nameError ? styles.error : ""}`}
              >
                {name.trim().length} / {NAME_MAX}
              </span>
            </div>
            <div>
              <input
                className={`${styles.input} ${nameError ? styles.error : ""}`}
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                type="text"
                placeholder="상품명을 입력해주세요"
              />
              <div className={styles.errorMessage}>{nameError}</div>
            </div>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.labelArea}>
              <label className={styles.label}>상품 소개</label>
              <span
                className={`${styles.length} ${descError ? styles.error : ""}`}
              >
                {description.trim().length} / {DESC_MAX}
              </span>
            </div>
            <div>
              <textarea
                className={`${styles.textArea} ${
                  descError ? styles.error : ""
                }`}
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={loading}
                type="text"
                placeholder="상품 소개를 입력해주세요"
              />
              <div className={styles.errorMessage}>{descError}</div>
            </div>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label}>판매가격</label>
            <div>
              <input
                className={`${styles.input} ${priceError ? styles.error : ""}`}
                value={price}
                onChange={e => setPrice(e.target.value)}
                disabled={loading}
                type="number"
                placeholder="판매 가격을 입력해주세요"
              />
              <div className={styles.errorMessage}>{priceError}</div>
            </div>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.labelArea}>
              <label className={styles.label}>태그</label>
              <span
                className={`${styles.length} ${
                  tagInputError ? styles.error : ""
                }`}
              >
                {tagInput.trim().length} / 5
              </span>
            </div>
            <div>
              <input
                className={`${styles.input} ${
                  tagInputError ? styles.error : ""
                }`}
                value={tagInput}
                onChange={tagInputChange}
                onKeyDown={tagInputKeyDown}
                disabled={loading}
                type="text"
                placeholder="태그를 입력해주세요"
              />
              <div className={styles.errorMessage}>{tagInputError}</div>
              <div className={styles.tagBoxArea}>
                {tags.map((tag, idx) => (
                  <span className={styles.tagBox} key={idx}>
                    #{tag}
                    <button
                      className={styles.tagDeleteButton}
                      type="button"
                      onClick={() => removeTagBox(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
