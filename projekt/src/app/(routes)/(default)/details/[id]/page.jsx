import RelatedProducts from "@/components/ui/related-products";
import asyncFetch from "@/utils/async-fetch";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await asyncFetch(`listings/${id}`);

  return {
    title: product.title
  };
};

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await asyncFetch(`listings/${id}`);

  const formattedTime = product.asset.createdAt.split("T")[0];

  return (
    <>
      <article>
        <figure>
          <Image
            src={product.asset.url}
            alt={`cover of ${product.title}`}
            width={600}
            height={600}
            quality={75}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEW2tLLDbwZkAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
            className="w-full h-full object-cover"
          />
        </figure>

        <section>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <span>On SwapHub since: {formattedTime}</span>
          <button>Propose a swap</button>
        </section>
      </article>

      <RelatedProducts productId={product.id} userId={product.userId}/>

    </>
  );
}