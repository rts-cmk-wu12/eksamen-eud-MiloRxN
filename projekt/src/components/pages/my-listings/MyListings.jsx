"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState } from "react";
import deleteListingAction from "@/components/pages/my-listings/delete-listing-action";
import { useActionState } from "react";

export default function MyListings({ myListings }) {
  const [formState, formAction, pending] = useActionState(deleteListingAction);
  const [showModal, setShowModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

   useEffect(() => {
      if (showModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
  
      return () => {
        document.body.style.overflow = '';
      };
    }, [showModal]);

  return (
    <>
      <section className="space-y-4">
        {myListings.map(listing => (
          <article key={listing.id} className="flex flex-col p-2 sm:flex-row border rounded overflow-hidden">
            <figure className="flex flex-col justify-center items-center border rounded w-full sm:w-40 min-h-40 relative">
              <Image
                src={listing.asset.url}
                alt={listing.title}
                fill
                sizes="321px"
                className="object-contain w-full h-full rounded"
              />
              <figcaption className="sr-only">{listing.title}</figcaption>
            </figure>
            <div className="flex flex-col flex-1 px-4 py-2 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-lg truncate block max-w-full sm:max-w-xs" title={listing.title}>{listing.title}</h2>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    type="button"
                    className="button-secondary border-0"
                    onClick={() => {
                      setSelectedListingId(listing.id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                  <Link href={`/my-listings/edit/${listing.id}`} className="button-primary border-0">Edit</Link>
                </div>
              </div>
              <div className="text-silver mt-2 max-h-24 overflow-y-auto">
                {listing.description}
              </div>
            </div>
          </article>
        ))}
      </section>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <form
            action={formAction}
            className="bg-neutral-100 rounded-lg shadow-xl p-6 flex flex-col justify-center items-center"
          >
            <span className="text-lg">Are you sure, you want to delete?</span>
            <div className="flex w-full justify-between gap-2 mt-4">
              <button
                type="submit"
                className="button-secondary border-0 w-1/2"
              >Delete</button>
              <button
                type="button"
                className="button-primary p-2 border-0 w-1/2"
                onClick={() => setShowModal(false)}
              >Cancel</button>
              <input type="hidden" name="listingId" readOnly value={selectedListingId} />
            </div>
             {formState?.errors && (
              <span className="text-sm">{formState.errors}</span>
            )}
          </form>
        </div>
      )}
    </>
  );
}
