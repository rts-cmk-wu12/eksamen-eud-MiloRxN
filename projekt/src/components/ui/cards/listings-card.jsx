"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card({ product, selectable = false, onSelect }) {
  const content = (
    <div className="block rounded-product-card border border-product-card-border hover:shadow-md transition-shadow max-w-xs mx-auto">
      <div className="aspect-square p-3">
        <Image
          src={product?.asset?.url}
          alt={product?.title}
          width={300}
          height={300}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEW2tLLDbwZkAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTSuQmCC"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-3 pb-2">
        <p className="text-product-card-text">{product?.title}</p>
      </div>
    </div>
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