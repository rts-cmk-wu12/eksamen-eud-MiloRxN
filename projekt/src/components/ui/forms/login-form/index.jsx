// Taget fra tidligere projekt.
"use client";

import { useActionState } from "react";
import loginAction from "./login-action";

export default function LoginForm() {
  const [formState, formAction, pending] = useActionState(loginAction);

  return (
    <>
    <form action={formAction}>
      <div>
        <span>email</span>
        <label>
          <input type="email" name="email" placeholder="Your email..." defaultValue={formState?.data?.email}/>
        </label>
          <span>{formState?.properties?.email?.error}</span>
      </div>
      <div>
        <span>password</span>
        <label>
          <input type="password" name="password" placeholder="Your password..." defaultValue={formState?.data?.password}/>
        </label>
          <span>{formState?.properties?.password?.error}</span>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )
}