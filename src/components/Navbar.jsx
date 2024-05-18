'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import localFont from 'next/font/local'

const myFont = localFont({ src: '../../public/fonts/Catorze27/Catorze27-Style-1-SemiBold.ttf' })
function NavBar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div style={myFont.style}
    >
      <nav className="w-full bg-white fixed top-0 left-0 text-gray-700  shadow-md  z-50">
        <div className="md:flex md:justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:px-28">
          <div >
            <div className="flex items-center  justify-between py-3  md:block">
              {/* LOGO */}
              <Link href="/">
                {/* <h2 className="text-2xl text-black font-bold ">DZMARBELLA</h2> */}
                <Image src={"/dzLogo.svg"} width={200} height={200} alt='logo' unoptimized={true}/>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/menu.svg"
                      unoptimized={true}
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div >
            <div
              className={`flex-1 justify-self-center pb-3 md:block md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-10 items-center pt-4 justify-center md:flex ">
                <li className="pb-6 text-2xl md:text-base font-semibold  py-2 md:px-6 text-center my-4 md:mb-0 border-b-2 md:border-b-0 md:hover:text-[#959faf] cursor-pointer md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    HOME
                  </Link>
                </li>
                <li className="pb-6  font-semibold py-2 px-6 text-center my-4 md:mb-0  border-b-2 md:border-b-0 text-2xl md:text-base  md:hover:text-[#959faf] cursor-pointer ">
                  <Link href="/rental-services" onClick={() => setNavbar(!navbar)}>
                  RENTALS
                  </Link>
                </li>
                <li className="pb-6 text-2xl md:text-base font-semibold py-2 px-6 text-center my-4 md:mb-0  border-b-2 md:border-b-0  md:hover:text-[#959faf] cursor-pointer ">
                  <Link href="/booking-services" onClick={() => setNavbar(!navbar)}>
                    BOOKING SERVICES
                  </Link>
                </li>
                <li className="pb-6 text-2xl md:text-base font-semibold py-2 px-6 text-center my-4 md:mb-0 border-b-2 md:border-b-0   md:hover:text-[#959faf] cursor-pointer md:hover:bg-transparent">
                  <Link href="/#contact" onClick={() => setNavbar(!navbar)}>
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;