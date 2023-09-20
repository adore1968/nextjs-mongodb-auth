"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-700 flex justify-between items-center px-10 py-5">
      <h1 className="text-xl sm:text-2xl font-semibold">
        <Link href="/">NextCredentials</Link>
      </h1>
      <ul className="flex items-center gap-5 text-gray-200 text-lg sm:text-xl">
        {session ? (
          <li>
            <Link href="/dashboard/profile">Profile</Link>
          </li>
        ) : (
          <>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-50 transition-colors ease-out"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-gray-50 transition-colors ease-in"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-gray-50 transition-colors ease-out"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
