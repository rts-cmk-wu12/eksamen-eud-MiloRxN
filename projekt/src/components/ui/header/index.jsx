import NavLink from "@/components/typography/nav-link";
import { readCookie } from "@/utils/cookies";
import Image from "next/image";
import Link from "next/link";


export default async function Header() {

  const userId = await readCookie("sh_user_id")

  return (
    <header className="flex items-center justify-between p-8 border-b-2 border-gray2">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={"/icons/logo.svg"} height={48} width={48} alt="Logo of SwapHub" />
        <h1>SwapHub</h1>
      </Link>

      <nav className="flex items-center gap-4">
        <ul className="flex gap-2">
          <li className="">
            <NavLink path="/" activeStyle={"active-link"}>
              Listings
            </NavLink>
          </li>
          <li className="">
            <NavLink path="#" activeStyle={"active-link"}>
              Community
            </NavLink>
          </li>
          <li className="">
            <NavLink path="#" activeStyle={"active-link"}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="space-x-4">
          {userId ? (
            <>
              <NavLink path={"/profile"} className="button-secondary">
                profile
              </NavLink>
              <NavLink path={"/logout"} className="button-primary">
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink path={"/login"} className="button-secondary">
                Sign in
              </NavLink>
              <NavLink path={"#"} className="button-primary">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}