"use server";
import z from "zod";

export default async function newsletterAction(prevState, formData) {
  const { email } = Object.fromEntries(formData);

  const schema = z.object({
    email: z.email({ message: "Invalid email address!" }),
  });

  const validated = schema.safeParse({ email });

  if (!validated.success) {
    return {
      ...validated,
      ...(z.treeifyError(validated.error)),
      data: { email }
    };
  }

  const response = await fetch(`http://localhost:4000/api/v1/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: validated.data.email,
    })
  });

  if (!response.ok) {
    return {
      success: false,
      errors: ["Failed to subscribe. Try again later."],
      data: { email }
    };
  }

  return {
    success: true,
    message: ["You've been subscribed to the newsletter."],
  };
}
