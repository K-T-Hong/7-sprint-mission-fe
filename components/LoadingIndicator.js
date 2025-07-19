import dynamic from "next/dynamic";
import styles from "./LoadingIndicator.module.css";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function LoadingIndicator() {
  return (
    <div className={styles.area}>
      <Player autoplay loop src="/Loading.json" className={styles.img} />
      <span className={styles.text}>로딩 중!!</span>
    </div>
  );
}
