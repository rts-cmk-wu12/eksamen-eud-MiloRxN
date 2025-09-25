"use client";
import { useActionState } from "react";
import profileAction from "./profile-action";
import { useEffect } from "react";

export default function ProfileForm({ user }) {
  const [formState, formAction, pending] = useActionState(profileAction);

  return (
    <form action={formAction}>
      <h2>Update Profile</h2>
      <div>
        <label>
          <span>First name</span>
          <input
            type="text"
            name="firstname"
            defaultValue={user.firstname}
          />
          <span className="error-message"></span>
        </label>

        <label>
          <span>Last name</span>
          <input
            type="text"
            name="lastname"
            defaultValue={user.lastname}
          />
          <span className="error-message"></span>
        </label>
      </div>

      {/* Email */}
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
        />
        <span className="error-message"></span>
      </label>

      {/* Password */}
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="New password"
        />
        <span className="error-message"></span>
      </label>

      <button
        type="submit"
        disabled={pending}
      >
        {pending ? "Updating..." : "Update profile"}
      </button>

      <p className="success-message"></p>

      <input type="hidden" name="old_password" readOnly value={user.password} />
    </form>

  );
}
