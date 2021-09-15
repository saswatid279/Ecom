export default function getSortedData(product, s) {
  if (s && s === "HIGH_TO_LOW")
    return product.sort((a, b) => b["price"] - a["price"]);
  if (s && s === "LOW_TO_HIGH")
    return product.sort((a, b) => a["price"] - b["price"]);
  return product;
}
