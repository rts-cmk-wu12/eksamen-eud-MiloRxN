// taget fra tidligere projekt
'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({ children, className, path = "/", activeStyle }) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`${className} ${pathname === path ? activeStyle : ''}`}
    >
      {children}
    </Link>
  );
}