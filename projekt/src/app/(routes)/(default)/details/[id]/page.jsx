import ProposeButton from "@/components/pages/details/propose-button";
import RelatedProducts from "@/components/pages/details/related-products";
import asyncFetch from "@/utils/async/async-fetch";
import { readCookie } from "@/utils/async/cookies";
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

  const userId = await readCookie("sh_user_id")

  const formattedTime = product.asset.createdAt.split("T")[0];

  return (
    <>
      <article className="flex justify-center gap-12 mb-3">
        <Image
          src={product.asset.url}
          alt={`cover of ${product.title}`}
          width={600}
          height={600}
          quality={75}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEW2tLLDbwZkAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
          className="w-full h-full object-cover aspect-square max-w-96 shadow-lg rounded-md"
        />

        <section className="space-y-4">
          <h1>{product.title}</h1>
          <p className="text-primary">{product.description}</p>
          <span className="text-primary block">
            On SwapHub since: {formattedTime}
          </span>

          {userId && userId !== product.userId && (
            <ProposeButton userId={userId} product={product} />
          )}
        </section>
      </article>

      {/* Related Products */}
      <RelatedProducts productId={product.id} userId={product.userId} />
    </>
  );
}