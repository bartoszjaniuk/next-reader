import { useState } from "react";
import Image from "next/image";
import { icons } from "./icons";
import LogoImage from "../../assets/book-logo.png";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";
import { useSession } from "next-auth/react";
import { LoginOrLogout } from "./LoginOrLogout";
import Link from "next/link";
import { useThemeMode } from "@/hooks/useThemeMode";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);
  const { status } = useSession();

  const { renderThemeToggler } = useThemeMode();

  return (
    <aside
      className={`bg-layoutLight text-white shadow-md dark:bg-layoutDark dark:text-gray-900 p-5 px-2 duration-300 bottom-0 left-0 flex w-full h-[80px] fixed justify-evenly items-center sm:justify-center sm:h-screen sm:block  ${
        isOpen ? "sm:w-60" : "sm:w-20"
      }  sm:relative`}
    >
      <ArrowIcon
        onClick={toggleIsOpen}
        className={`w-7 h-7 hidden sm:block bg-layoutLight text-gray-900 border dark:bg-layoutDark dark:text-white dark:border-backgroundDark text-3xl rounded-full absolute -right-3 top-3 shadow-sm p-1 cursor-pointer ${
          isOpen ? "rotate-0" : "rotate-180"
        }`}
      />
      <div className="flex w-full justify-center">
        <Image
          src={LogoImage}
          alt="Logo"
          width={60}
          height={60}
          className="hidden my-5 sm:flex sm:self-center"
        />
      </div>
      {icons.map((icon) => {
        return (
          <Link key={icon.name} className="sidebar-icon" href={icon.path}>
            <li className="flex gap-2">
              <span className="text-2xl block float-left">{icon.icon}</span>
              <span
                className={`text-base font-medium flex-1 whitespace-nowrap duration-200 ${
                  !isOpen && "hidden"
                } `}
              >
                {icon.name}
              </span>
            </li>
          </Link>
        );
      })}
      <LoginOrLogout isOpen={isOpen} isLoggedIn={status === "authenticated"} />
      <li className="sidebar-icon sm:hidden border-l-2 rounded-none ">
        {renderThemeToggler(true)}
      </li>
    </aside>
  );
};
