import Link from "next/link";
import styles from "./ItemList.module.css";

export default function ItemList({ items }) {
  return (
    <ul className={styles.ul}>
      {items?.map(item => (
        <li key={item.id}>
          <Link className={styles.area} href={`/items/${item.id}`}>
            <div className={styles.img} />
            <div className={styles.textBox}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>
                {Number(item.price).toLocaleString()}원
              </span>
              <span className={styles.like}>❤ 240</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
