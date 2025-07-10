import ArticleList from "@/components/ArticleList";
import axios from "@/lib/axios";
import Link from "next/link";
import styles from "@/styles/board.module.css";

export async function getStaticProps() {
  const res = await axios.get("/article");

  const articles = res.data.list;

  return { props: { articles } };
}

export default function Board({ articles }) {
  return (
    <div className={styles.area}>
      <div className={styles.bestBox}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>
        <div className={styles.bestArticle}>
          <h1>일단 최신순 3개 개시글 시간되면 좋아요 순으로 변경</h1>
        </div>
      </div>
      <div className={styles.articleList}>
        <div className={styles.listTitleBox}>
          <h1 className={styles.listTitle}>게시글</h1>
          <Link className={styles.postBtn} href="/postArticle">
            글쓰기
          </Link>
        </div>
        <div className={styles.listOption}>
          <input
            className={styles.input}
            placeholder="검색할 상품을 입력해주세요"
          />
          <section>
            <option>최신순</option>
            <option>좋아요순</option>
          </section>
        </div>
        <div className={styles.listBox}>
          <ArticleList articles={articles} />
        </div>
        <div>
          <h1>페이지네이션</h1>
        </div>
      </div>
    </div>
  );
}
