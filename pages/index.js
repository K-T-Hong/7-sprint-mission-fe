import Link from "next/link";
import styles from "@/styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <main>
        <section className={`${styles.title} ${styles.area}`}>
          <div className={styles.titlePosition}>
            <div className={styles.titleContent}>
              <h1 className={styles.titleWord}>
                일상의 모든 물건을 거래해보세요
              </h1>
              <div className={styles.seeContainer}>
                <Link href="/sightseeing" className={styles.seeButton}>
                  구경하러 가기
                </Link>
              </div>
            </div>
            <div className={styles.titleImg} />
          </div>
        </section>
        <section className={`${styles.content} ${styles.area}`}>
          <div className={`${styles.top} ${styles.position}`}>
            <div className={styles.topPageImg} />
            <div className={`${styles.topPage} ${styles.container}`}>
              <p className={styles.tag}>Hot item</p>
              <div className={`${styles.right} ${styles.wordBox}`}>
                <h1 className={styles.h1}>인기 상품을 확인해 보세요</h1>
                <p className={styles.sentence}>
                  가장 HOT한 중고거래 물품을 판다 마켓에서 확인해보세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.content} ${styles.area}`}>
          <div className={`${styles.center} ${styles.position}`}>
            <div className={`${styles.centerPage} ${styles.container}`}>
              <p className={styles.tag}>Search</p>
              <div className={`${styles.left} ${styles.wordBox}`}>
                <h1 className={styles.h1}>구매를 원하는 상품을 검색하세요</h1>
                <p className={styles.sentence}>
                  구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
                </p>
              </div>
            </div>
            <div className={styles.centerPageImg} />
          </div>
        </section>

        <section className={`${styles.content} ${styles.area}`}>
          <div className={`${styles.bottom} ${styles.position}`}>
            <div className={styles.bottomPageImg} />
            <div className={`${styles.bottomPage} ${styles.container}`}>
              <p className={styles.tag}>Register</p>
              <div className={`${styles.right} ${styles.wordBox}`}>
                <h1 className={styles.h1}>판매를 원하는 상품을 등록하세요</h1>
                <p className={styles.sentence}>
                  어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.end} ${styles.area}`}>
          <div className={styles.endPosition}>
            <h1 className={styles.endTitle}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
            <div className={styles.bottomImg} />
          </div>
        </section>
      </main>
    </div>
  );
}
