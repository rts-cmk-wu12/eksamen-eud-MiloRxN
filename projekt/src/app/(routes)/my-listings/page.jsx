import asyncFetch from "@/utils/async/async-fetch";
import { readCookie } from "@/utils/async/cookies";
import Image from "next/image";
import Link from "next/link";
import MyListings from "@/components/pages/my-listings/MyListings";

export default async function MyListingsPage() {
  const accessToken = await readCookie("sh_access_token");
  const userId = await readCookie("sh_user_id");

  const listings = await asyncFetch("listings", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const myListings = listings.filter(listing => listing.user?.id === userId);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link href="/my-listings/create" className="button-primary">Create Listing</Link>
      </div>
      <MyListings myListings={myListings} />
    </>
  );
}