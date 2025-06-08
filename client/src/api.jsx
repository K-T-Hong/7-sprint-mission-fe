export async function getProduct() {
  const response = await fetch(
    "http://localhost:4000/products?page=1&pageSize=1000"
  );
  return await response.json();
}
