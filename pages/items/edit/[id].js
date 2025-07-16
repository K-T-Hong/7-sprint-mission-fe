import PostItem from "@/components/PostItem";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

async function fetchItem(id) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
    enabled: !!id,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (!item) return <div>해당 상품이 없습니다.</div>;

  return <PostItem item={item} />;
}
