// Taget fra tidligere projekt.
"use client";

import { useActionState } from "react";
import loginAction from "./login-action";

export default function LoginForm() {
  const [formState, formAction, pending] = useActionState(loginAction);

  return (
    <>
      <form action={formAction} className="form">
        <div>
          <label>
            <span>email</span>
            <input type="email" name="email" placeholder="Your email..." defaultValue={formState?.data?.email} />
          </label>
          <span className="error-message">{formState?.properties?.email?.error}</span>
        </div>
        <div>
          <label>
            <span>password</span>
            <input type="password" name="password" placeholder="Your password..." defaultValue={formState?.data?.password} />
          </label>
          <span className="error-message">{formState?.properties?.password?.error}</span>
        </div>
        <button className="button-primary py-2 w-full" type="submit">Sign in</button>
      </form>
    </>
  )
}