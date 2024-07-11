"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {
  const { data: session } = useSession();
  // const isLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const userImage = session?.user.image;
  const userEmail = session?.user.email;
  //to allow google login/signIN
  useEffect(() => {
    const setUpProvider = async () => {
      try {
        const response = await getProviders();

        setProviders(response);
      } catch (error) {
        console.log("Error fetching providers:", error);
      }
    };
    setUpProvider();
    // console.log(providers);
  }, []);
  return (
    <nav className=" flex-between w-full pt-3 mb-16">
      <Link href={"/"} className="flex gap-2 flex-center">
        {/* <Image
          alt="logo"
          src="./assets/images/logo.svg"
          width={30}
          height={30}
        /> */}
        <p className=" font-playwrite tracking-wide font-semibold text-lg">Prompt-G</p>
      </Link>
      {/* desktop view  */}
      <div className=" sm:flex hidden ">
        {session?.user ? (
          <div className="flex gap-2 md:gap-5">
            <Link href={"/create-prompt"} className=" text-blue-600 font-nunito hover:bg-black hover:text-white  border border-black rounded-full py-1.5 px-5 transition-all text-center text-sm flex items-center justify-center">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className=" text-red-600 font-nunito hover:bg-black hover:text-white  border border-black rounded-full py-1.5 px-5 transition-all text-center text-sm flex items-center justify-center">
              Sign Out
            </button>
            <Link href="/profile">
              {userImage ? (
                <Image
                  alt="profile"
                  className="rounded-full"
                  width={37}
                  height={37}
                  src={userImage}
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-full bg-gray-500 text-white"
                  style={{ width: 37, height: 37 }}
                >
                  {userEmail ? userEmail.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* {alert(session?.user)} */}
      {/* {alert(providers)} */}
      {/* mobile view  */}
      <div className="sm:hidden flex">
        {session?.user ? (
          <div className=" relative">
            <Image
              alt="profile"
              className=" rounded-full border-neutral-500 border cursor-pointer"
              width={37}
              height={37}
              src={session?.user.image}
              onClick={() => setToggleDropdown((pre) => !pre)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link  px-5 py-1.5 shadow-md hover:bg-gray-200 rounded-full"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link mt-3  px-5 py-1.5 shadow-md hover:bg-gray-200 rounded-full"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompts
                </Link>
                <button
                  type="submit"
                  className=" mt-3 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
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
