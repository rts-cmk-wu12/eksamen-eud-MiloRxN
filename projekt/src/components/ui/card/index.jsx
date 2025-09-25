"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card({ product, selectable = false, onSelect }) {
  const content = (
    <figure className="block rounded-product-card border border-product-card-border hover:shadow-md transition-shadow">
      <div className="p-3 rounded-product-card">
        <Image
          src={product?.asset?.url}
          alt={product?.title}
          width={300}
          height={300}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEW2tLLDbwZkAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTSuQmCC"
          className="object-cover aspect-square rounded-md w-full h-full"
        />
      </div>
      <figcaption className="text-product-card-text px-3 pb-1 min-h-[50px] line-clamp-2 overflow-hidden">
        {product?.title}
      </figcaption>
    </figure>
  );

  return selectable ? (
    <div onClick={() => onSelect?.(product.id)} className="cursor-pointer">
      {content}
    </div>
  ) : (
    <Link href={`/details/${product?.id}`}>
      {content}
    </Link>
  );
}