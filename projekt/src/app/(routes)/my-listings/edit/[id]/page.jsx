import ListingForm from "@/components/pages/my-listings/form";
import asyncFetch from "@/utils/async/async-fetch";
import { readCookie } from "@/utils/async/cookies";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await asyncFetch(`listings/${id}`);

  return {
    title: `Edit - ${listing.title}`
  };
};

export default async function EditListingPage({ params }) {
  const accessToken = await readCookie("sh_access_token");
  const listing = await asyncFetch(`listings/${params.id}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="sr-only">Edit Listing</h1>
      <ListingForm mode="edit" listing={listing} />
    </div>
  );
}