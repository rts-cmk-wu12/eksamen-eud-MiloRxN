import { logoutAction } from "@/components/actions/logout-action";
import NavLink from "@/components/ui/nav-link";
import { readCookie } from "@/utils/async/cookies";
import Image from "next/image";


export default async function Header() {

  const userId = await readCookie("sh_user_id")

  return (
    <header className="flex items-center justify-between p-8 border-b-2 border-gray2 mb-12">
      <NavLink path="/" className="flex gap-2 items-center">
        <Image src={"/icons/logo.svg"} height={48} width={48} alt="Logo of SwapHub" />
        <span>SwapHub</span>
      </NavLink>

      <nav className="flex items-center gap-4">
        <ul className="flex gap-2">
          <li className="">
            <NavLink path="/" activeStyle={"active-link"}>
              Listings
            </NavLink>
          </li>
          <li className="">
            <NavLink path="/my-listings" activeStyle={"active-link"}>
              My listings
            </NavLink>
          </li>
          <li className="">
            <NavLink path="/newsletter" activeStyle={"active-link"}>
              Newsletter
            </NavLink>
          </li>
        </ul>

        <div className="space-x-4">
          {userId ? (
            <>
              <NavLink path={"/profile"} activeStyle={"active-link"}>
                Profile
              </NavLink>

              <form action={logoutAction} className="inline">
                <button type="submit" className="button-primary border-0">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
                <NavLink path={"/login"} className="button-primary">
                Sign in
              </NavLink>
              <NavLink path={"/register"} className="button-secondary">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}