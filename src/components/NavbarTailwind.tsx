"use client";

import { CircleFadingPlus, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "Dashboard", link: "/dashboard" },
];

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="relative z-20 border-b border-white text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between  px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* hamburger menu */}
          <button
            onClick={handleShowNav}
            aria-label="Toggle Menu"
            className="md:hidden"
          >
            <MenuIcon color="#FFFFFF" strokeWidth={3} size={25} />
          </button>
          {/* logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="self-center whitespace-nowrap text-xl font-semibold  md:text-2xl">
              Mystery Message
            </span>
          </Link>
          {/* nav links */}
          <div
            className={`absolute left-0 right-0 -z-10 flex w-full flex-col gap-3  p-3 shadow transition-all duration-300 ease-in-out md:relative md:left-0 md:right-auto md:top-auto md:z-auto md:flex-row md:shadow-none bg-[#18181b] md:bg-[#18181b] ${
              showNav ? "top-[60px]" : "top-[-165px]"
            }`}
          >
            {navLinks.map(({ title, link }, index) => (
              <Link
                key={index}
                href={link}
                className="rounded-md px-3 py-2  transition-colors duration-100 ease-linear hover:bg-gray-700 hover:text-white"
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
        {/* CTA button */}
        <div>
          {session ? (
            <>
              {/* <span className="mr-4 font-bold text-sm">
                Welcome :{" "}
                <Link href="/dashboard" className="uppercase">
                  {user?.username || user?.email}
                </Link> */}
              {/* </span> */}
              <Button
                className="w-full md:w-auto border border-white"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <span>
              <>
                <Link href={"/sign-in"} className="border border-white">
                  <Button className="w-full md:w-auto border border-white">
                    Login
                  </Button>
                </Link>
              </>
            </span>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
