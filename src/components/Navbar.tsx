"use client";
import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { ThemeToggle } from "./theme-toggler";

const Navbar: FC = () => {
  return (
    <header className="flex items-center justify-between px-5 md:px-10 py-2">
      <Link href="/" className="flex items-center gap-1">
        <div className="">
          <Image
            src="/Dropbox_Icon.png"
            alt="Logo"
            className=""
            height={40}
            width={40}
          />
        </div>
        <span className="font-bold text-xl">Dropbox</span>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
