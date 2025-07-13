import axios from "@/lib/axios";
import PostArticle from "@/components/PostArticle";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await axios.get(`/article/${id}`);
    return { props: { article: res.data } };
  } catch {
    return { notFound: true };
  }
}

export default function EditPage({ article }) {
  return <PostArticle article={article} />;
}
