import ProfileForm from "@/components/pages/profile/form";
import asyncFetch from "@/utils/async/async-fetch";
import { readCookie } from "@/utils/async/cookies";

export const metadata = {
  title: 'Profile'
};

export default async function ProfilePage() {

  const accessToken = await readCookie("sh_access_token")
  const userId = await readCookie("sh_user_id")

  const user = await asyncFetch(`users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return (
    <>
      <h1 className="sr-only">Profile</h1>
      <ProfileForm user={user} />
    </>
  )
}