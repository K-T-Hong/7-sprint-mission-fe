import { useState } from "react";
import Image from "next/image";
import styles from "./DropDownButton.module.css";

const options = [
  { value: "recent", label: "최신순", icon: "/ic_sort.svg" },
  { value: "like", label: "좋아요순", icon: "/ic_sort.svg" },
];

export default function DropDownButton({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const current = options.find(opt => opt.value === sort);

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label="정렬 방법 선택"
      >
        <div className={styles.hideOnMobile}>
          <span className={styles.btnText}>{current.label}</span>
          <div className={styles.arrow} />
        </div>
        <span className={styles.showOnMobile}>
          <Image
            className={styles.img}
            src={current.icon}
            width={24}
            height={24}
            alt={current.label}
          />
        </span>
      </button>
      {open && (
        <ul className={styles.menu}>
          {options.map(opt => (
            <li key={opt.value}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setSort(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
