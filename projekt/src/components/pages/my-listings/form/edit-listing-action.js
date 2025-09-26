"use server"

import asyncFetch from "@/utils/async/async-fetch";
import { readCookie } from "@/utils/async/cookies";
import { redirect } from "next/navigation";
import z from "zod";

export default async function editListingAction(prevState, formData) {
  const { image, title, description, listingId } = Object.fromEntries(formData);

  const schema = z.object({
    image: z.file()
      .min(1_000, { message: 'File is too small, minimum is 1KB' })
      .max(5_000_000, { message: 'File is too large, maximum is 5MB' })
      .mime(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif', 'application/octet-stream'], { message: 'Filetype not allowed' }),
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
  });

  const validated = schema.safeParse({ image, title, description })

  if (!validated.success) return {
    ...validated,
    ...(z.treeifyError(validated.error)),
    data: { title, description }
  };

  const accessToken = await readCookie('sh_access_token');

  const form = new FormData();
  form.append('file', validated.data.image);

  const data = await asyncFetch('assets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: form
  });

  const response = await fetch(`http://localhost:4000/api/v1/listings/${listingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      title: validated.data.title,
      description: validated.data.description,
      assetid: data.id
    })
  });

  if (!response.ok) return {
    success: false,
    errors: ['Something went wrong, please try again later'],
  };

  redirect('/my-listings');

}