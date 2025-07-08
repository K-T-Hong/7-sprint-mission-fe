import ArticleList from "@/components/ArticleList";
import axios from "@/lib/axios";
import Link from "next/link";

export async function getStaticProps(content) {
  const res = await axios.get("/article");

  const articles = res.data.list;

  return { props: { articles } };
}

export default function Board({ articles }) {
  return (
    <div style={{ marginTop: 68 }}>
      <div>
        <h1>베스트 게시글</h1>
        <div>
          <h1>일단 최신순 3개 개시글 시간되면 좋아요 순으로 변경</h1>
        </div>
      </div>
      <div>
        <div>
          <h1>게시글</h1>
          <Link href="/postArticle"> 글쓰기</Link>
        </div>
        <div>
          <input placeholder="검색할 상품을 입력해주세요" />
          <section>
            <option>최신순</option>
            <option>좋아요순</option>
          </section>
        </div>
        <div>
          <h1>게시글 리스트 5개</h1>
          <ArticleList articles={articles} />
        </div>
        <div>
          <h1>페이지네이션</h1>
        </div>
      </div>
    </div>
  );
}
