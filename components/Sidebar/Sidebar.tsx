import Image from "next/image";
import React, { useState } from "react";
import { icons } from "./icons";
import LogoImage from "../../assets/book-logo.png";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <aside
      className={`bg-gray-100 text-white shadow-md dark:bg-layoutDark dark:text-gray-900 h-screen p-5 px-2  ${
        isOpen ? "w-60" : "w-20"
      } duration-300 relative`}
    >
      <ArrowIcon
        onClick={toggleIsOpen}
        className={`w-7 h-7 bg-gray-100 text-gray-900 border dark:bg-layoutDark dark:text-white dark:border-backgroundDark text-3xl rounded-full absolute -right-3 top-3 shadow-sm p-1 cursor-pointer ${
          isOpen ? "rotate-0" : "rotate-180"
        }`}
      />
      <Image
        src={LogoImage}
        alt="Logo"
        width={60}
        height={60}
        className="flex my-5"
      />
      {icons.map((icon) => {
        return (
          // <li
          //   className={`sidebar-icon ${
          //     isOpen ? "justify-start" : "justify-center"
          //   } text-sm`}
          //   key={icon.name}
          // >
          //   {icon.icon}
          //   {isOpen && "TEXT"}
          // </li>
          <li key={icon.name} className="sidebar-icon">
            <span className="text-2xl block float-left">{icon.icon}</span>
            <span
              className={`text-base font-medium flex-1 duration-200 ${
                !isOpen && "hidden"
              } `}
            >
              Dashboard
            </span>
          </li>
        );
      })}
    </aside>
  );
};
