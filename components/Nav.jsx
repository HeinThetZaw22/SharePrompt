"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, getSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {
  const isLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  //to allow google login/signIN
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);
  return (
    <nav className=" flex-between w-full pt-3 mb-16">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          alt="logo"
          src="./assets/images/logo.svg"
          width={30}
          height={30}
        />
        <p className=" logo_text">Promptopia</p>
      </Link>
      {/* desktop view  */}
      <div className=" sm:flex hidden ">
        {isLoggedIn ? (
          <div className="flex gap-2 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                alt="profile"
                className=" rounded-full"
                width={37}
                height={37}
                src="/assets/images/logo.svg"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providr) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile view  */}
      <div className="sm:hidden flex">
        {isLoggedIn ? (
          <div className=" relative">
            <Image
              alt="profile"
              className=" rounded-full"
              width={37}
              height={37}
              src="/assets/images/logo.svg"
              onClick={() => setToggleDropdown((pre) => !pre)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompts
                </Link>
                 <button type="submit"
                 className=" mt-5 w-full black_btn"
                 onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                 }}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providr) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
