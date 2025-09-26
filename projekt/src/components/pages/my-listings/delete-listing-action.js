'use server';

import { revalidatePath } from "next/cache";
import { readCookie } from "@/utils/async/cookies";

async function deleteListingAction(prevState, formData) {
  const { listingId } = Object.fromEntries(formData);

  const accessToken = await readCookie("sh_access_token")
  const response = await fetch(`http://localhost:4000/api/v1/listings/${listingId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) return {
    success: false,
    errors: ['Failed to delete. Try again later']
  };

  revalidatePath('/my-listings');

  return {
    success: true
  };
}

export default deleteListingAction;