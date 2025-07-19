import PostItem from "@/components/PostItem";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorIndicator from "@/components/ErrorIndicator";

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

  if (isLoading) return <LoadingIndicator />;
  if (!item) return <ErrorIndicator errorMsg="해당 상품이 없습니다." />;

  return <PostItem item={item} />;
}
