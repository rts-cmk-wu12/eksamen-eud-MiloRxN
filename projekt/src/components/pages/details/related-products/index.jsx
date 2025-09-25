import Card from "@/components/ui/card"
import asyncFetch from "@/utils/async/async-fetch"



export default async function RelatedProducts({ userId, productId }) {

  const allProducts = await asyncFetch("listings")
  console.log("Related Products:", allProducts)
  console.log("Related Products:", userId, productId)

  const relatedProducts = allProducts.filter(product => product.userId === userId && product.id !== productId)

  if (relatedProducts.length) return (
    <>
        <h2 className="mb-4 mt-20">Other items from this Swapper</h2>
        <ul className="flex gap-4">
          {relatedProducts.map(product => (
            <li className="min-w-[200px] h-[300px] max-w-[200px] flex-shrink-0" key={product.id}>
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