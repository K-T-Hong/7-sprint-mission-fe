import PostArticle from "@/components/PostArticle";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

async function fetchArticle(id) {
  const res = await axios.get(`/article/${id}`);
  return res.data;
}

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (!article) return <div>해당 게시글이 없습니다.</div>;

  return <PostArticle article={article} />;
}
