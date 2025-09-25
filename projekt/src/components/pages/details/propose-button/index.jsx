"use client"
import { useEffect, useState } from "react";
import ProposeForm from "../form";

export default function ProposeButton({ userId, product }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isShown]);

  return (
    <>
      <button className="button-secondary px-2 py-0 mt-8" onClick={() => setIsShown(true)}>Propose a swap</button>
      {isShown && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-neutral-100 rounded-lg shadow-xl p-6 w-full max-w-3xl">
            <h2 className="text-xl mb-6">Propose a Trade</h2>
            <ProposeForm
              userId={userId}
              product={product}
              onCancel={() => setIsShown(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}