"use client";

import { useActionState } from "react";
import profileAction from "./profile-action";
import { useEffect, useState } from "react";

export default function ProfileForm({ user }) {
  const [formState, formAction, pending] = useActionState(profileAction);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);

  }, [formState?.message]);

  return (
    <form action={formAction} className="form max-w-xl mx-auto">
      <div className="flex gap-4">
        <label className="w-full">
          <span>First name</span>
          <input
            type="text"
            name="firstname"
            defaultValue={user.firstname}
          />
          <span className="error-message">{formState?.properties?.firstname?.errors}</span>
        </label>

        <label className="w-full">
          <span>Last name</span>
          <input
            type="text"
            name="lastname"
            defaultValue={user.lastname}
          />
          <span className="error-message">{formState?.properties?.lastname?.errors}</span>
        </label>
      </div>

      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
        />
        <span className="error-message">{formState?.properties?.email?.errors}</span>
      </label>
 
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="New password"
        />
        <span className="error-message">{formState?.properties?.password?.errors}</span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="button-primary py-2 w-full"
      >
        {pending ? "Updating..." : "Update profile"}
      </button>

      {showSuccess && (
        <p className="success-message">{formState?.message}</p>
      )}
    </form>
  );
}
