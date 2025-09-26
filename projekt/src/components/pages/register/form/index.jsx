// Taget fra tidligere projekt.
"use client";

import { useActionState, useEffect, useState } from "react";
import registerAction from "./register-action";

export default function RegisterForm() {
  const [formState, formAction, pending] = useActionState(registerAction);

    const [showSuccess, setShowSuccess] = useState(false);
  
    useEffect(() => {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
  
    }, [formState?.message]);

  return (
    <>
      <form action={formAction} className="form max-w-xl mx-auto">
        <div className="flex gap-4">
          <label className="w-full">
            <span>First name</span>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your given name..."
              defaultValue={formState?.data?.firstname}
            />
            <span className="error-message">{formState?.properties?.firstname?.errors}</span>
          </label>

          <label className="w-full">
            <span>Last name</span>
            <input
              type="text"
              name="lastname"
              placeholder="Enter your family name..."
              defaultValue={formState?.data?.lastname}
            />
            <span className="error-message">{formState?.properties?.lastname?.errors}</span>
          </label>
        </div>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            defaultValue={formState?.data?.email}
          />
          <span className="error-message">{formState?.properties?.email?.errors}</span>
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            defaultValue={formState?.data?.password}
          />
          <span className="error-message">{formState?.properties?.password?.errors}</span>
        </label>

        <span className="error-message">{formState?.errors}</span>
        <button
          type="submit"
          disabled={pending}
          className="button-primary py-2 w-full"
        >
          {pending ? "Creating account..." : "Create account"}
        </button>

        {showSuccess && (
          <p className="success-message">{formState?.message}</p>
        )}
      </form>
    </>
  )
}