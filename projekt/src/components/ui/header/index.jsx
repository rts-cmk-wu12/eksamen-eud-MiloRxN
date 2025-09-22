import NavLink from "@/components/typography/nav-link";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";


export default function Header() {

  return (
    <header className="flex items-center justify-between p-8 border-b-2 border-gray2">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={"/icons/logo.svg"} height={48} width={48} alt="Logo af SwapHub" />
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
          <Button className="button-secondary">
            Sign in
          </Button>
          <Button className="button-primary">
            Register
          </Button>
        </div>
      </nav>
    </header>
  )
}