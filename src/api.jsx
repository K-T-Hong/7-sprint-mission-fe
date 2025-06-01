export async function getProduct() {
  const response = await fetch(
    "https://panda-market-api.vercel.app/products?page=1&pageSize=1000"
  );
  return await response.json();
}
