"use client";
import { useActionState, useState } from "react";
import { useEffect } from "react";
import newsletterAction from "./newsletter-action";

export default function NewsletterForm() {
  const [formState, formAction, pending] = useActionState(newsletterAction);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [formState?.message]);

  return (
    <form action={formAction} className="form space-y-2" noValidate>
      {/* Email */}
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          defaultValue={formState?.data?.email}
        />
        <span className="error-message">{formState?.properties?.email?.errors}</span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="button-primary py-2 w-full"
      >
        {pending ? "Subscribing..." : "Subscribe!"}
      </button>

      {showSuccess && (
        <p className="success-message">{formState?.message}</p>
      )}
    </form>

  );
}
