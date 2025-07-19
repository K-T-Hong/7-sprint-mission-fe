import dynamic from "next/dynamic";
import styles from "./ErrorIndicator.module.css";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function ErrorIndicator({ errorMsg }) {
  return (
    <div className={styles.area}>
      <Player autoplay loop src="/Error.json" className={styles.img} />
      <span className={styles.text}>{errorMsg}</span>
    </div>
  );
}
