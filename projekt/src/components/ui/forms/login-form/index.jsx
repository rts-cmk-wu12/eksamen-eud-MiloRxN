// Taget fra tidligere projekt.
"use client";

import { useActionState, useEffect, useRef } from "react";
import loginAction from "./login-action";
import { redirect } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function LoginForm() {
  const [formState, formAction, pending] = useActionState(loginAction);
  const toastIdRef = useRef(null)


  // NOT WORKING because of renders and race condition
  // useEffect(function () {
  //   const id = pending ? toast.loading("Logger ind...") : null;
  //     console.log("RENDER DEBUG:");
  //     console.log("  - pending:", pending);
  //     console.log("  - formState:", formState);
  //     console.log("  - formState?.success:", formState?.success);
  //     console.log("  - toast id:", id);
  //   if (!formState?.success) return;

  //   if (!id) {
  //     toast.dismiss();
  //   }

  //   toast.update(id, {
  //     render: "Du er nu logget ind!",
  //     isLoading: false,
  //     onClose: function () {
  //       redirect("/");
  //     },
  //     closeOnClick: false,
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     position: "top-right"
  //   });
  // }, [formState, pending]);

  useEffect(() => {
    console.log("RENDER DEBUG:");
    console.log("  - pending:", pending);
    console.log("  - formState:", formState);
    console.log("  - formState?.success:", formState?.success);
    console.log("  - toast id:", toastIdRef.current);

    // Show loading toast when login starts
    if (pending && !toastIdRef.current) {
      toastIdRef.current = toast.loading("Logger ind...");
      console.log("  - Created loading toast:", toastIdRef.current);
      return;
    }

    if (!formState?.success) {
      console.log("  - Exiting early (no success)");
      toast.dismiss();
      return;
    }
    
    console.log("  - About to handle success");

    if (!toastIdRef.current) {
      console.log("  - No ID! Dismissing all toasts");
      toast.dismiss();
    } else {
      console.log("  - Updating toast with ID:", toastIdRef.current);
      toast.update(toastIdRef.current, {
        render: "Du er nu logget ind!",
        type: "success",
        isLoading: false,
        onClose: () => redirect("/profile"),
        closeOnClick: false,
        autoClose: 3000,
        hideProgressBar: true,
        position: "top-right"
      });
    }

    toastIdRef.current = null;
  }, [formState, pending]);

  return (
    <form action={formAction}>
      <div>
        <label>
          <span>Brugernavn</span>
          <input type="text" name="username" defaultValue={formState?.data?.username} />
          <span>{formState?.properties?.username?.errors}</span>
        </label>
      </div>
      <div>
        <label>
          <span>Adgangskode</span>
          <input type="password" name="password" defaultValue={formState?.data?.password} />
          <span>{formState?.properties?.password?.errors}</span>
        </label>
      </div>
      <div>{formState?.errors}</div>
      <button type="submit">Log ind</button>
      <ToastContainer/>
    </form>
  );
}