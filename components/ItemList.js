import Link from "next/link";
import styles from "./ItemList.module.css";
import Image from "next/image";

export default function ItemList({ items, onItemHover }) {
  return (
    <ul className={styles.ul}>
      {items?.map(item => (
        <li
          key={item.id}
          onMouseEnter={() => onItemHover && onItemHover(item.id)}
        >
          <Link className={styles.area} href={`/items/${item.id}`}>
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
            <div className={styles.textBox}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>
                {Number(item.price).toLocaleString()}원
              </span>
              <span className={styles.like}>❤ {item.favoriteCount}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
