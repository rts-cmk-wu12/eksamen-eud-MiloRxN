'use server';
import { redirect } from "next/navigation";
import z from "zod";
import { readCookie } from "@/utils/async/cookies";
import asyncFetch from "@/utils/async/async-fetch";

export default async function createAction(prevState, formData) {
  const { image, title, categoryId, description } = Object.fromEntries(formData);

  const schema = z.object({
    image: z.file()
      .min(1_000, { message: 'File is too small, minimum is 1KB' })
      .max(5_000_000, { message: 'File is too large, maximum is 5MB' })
      .mime(['image/png', 'image/jpeg', 'image/jpg','image/webp','image/avif', 'application/octet-stream'], { message: 'Filetype not allowed' }),
    title: z.string().min(1, { message: 'Title is required' }),
    categoryId: z.string().min(1, { message: 'Category is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
  });

  const validated = schema.safeParse({
    image, title, categoryId, description
  });

  if (!validated.success) return {
    ...validated,
    ...(z.treeifyError(validated.error)),
    data: { title, categoryId, description }
  };


  const userId = await readCookie('sh_user_id');
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

  const response = await fetch('http://localhost:4000/api/v1/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      title: validated.data.title,
      description: validated.data.description,
      assetid: data.id,
      userid: userId,
      categoryid: validated.data.categoryId
    })
  });

  if (!response.ok) return {
    success: false,
    errors: ['Failed to create listing. Please try again later.']
  };

  redirect('/my-listings');
}