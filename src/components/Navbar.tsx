"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <nav className="p-4 md:p-6 shadow-md border-b border-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link className="text-xl font-bold mb-4 md:mb-0" href="/">Myserty Message</Link>
        {session ? (
          <>
            <span className="mr-4 font-bold text-xl">Welcome : <Link href="/dashboard"
            className="uppercase">{user?.username || user?.email}</Link></span>
            <Button className="w-full md:w-auto border border-white" onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <span>
            <>
              <Link href={"/sign-in"} className="border border-white">
                <Button className="w-full md:w-auto border border-white"
                >Login</Button>
              </Link>
            </>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


