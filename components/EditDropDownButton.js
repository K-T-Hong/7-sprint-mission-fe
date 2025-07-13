import { useEffect, useRef, useState } from "react";
import styles from "./EditDropDownButton.module.css";

export default function EditDropDownButton({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.box} ref={ref}>
      <button className={styles.btnImg} onClick={() => setOpen(v => !v)} />
      {open && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={onEdit}>
            수정하기
          </button>
          <button className={styles.menuItem} onClick={onDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
