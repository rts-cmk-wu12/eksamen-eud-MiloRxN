import asyncFetch from "@/utils/async-fetch"
import Card from "../cards/listings-card"

export default async function RelatedProducts({ userId, productId }) {

  const allProducts = await asyncFetch("listings")
  console.log("Related Products:", allProducts)
  console.log("Related Products:", userId, productId)

  const relatedProducts = allProducts.filter(product => product.userId === userId && product.id !== productId)

  if (relatedProducts.length) return (
    <>
      <h2>Other items from this Swapper</h2>
      <ul>
        {relatedProducts.map(product => (
          <li key={product.id}>
            <Card product={product} />
          </li>
        ))}
      </ul>
    </>
  )
  else return (
    <>
      <h2>Other items from this Swapper</h2>
      <span>Swapper has no other Items</span>
    </>
  )
}