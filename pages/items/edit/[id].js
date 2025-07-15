import PostItem from "@/components/PostItem";
import axios from "@/lib/axios";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await axios.get(`/products/${id}`);
    return { props: { item: res.data } };
  } catch {
    return { notFound: true };
  }
}

export default function EditPage({ item }) {
  return <PostItem item={item} />;
}
