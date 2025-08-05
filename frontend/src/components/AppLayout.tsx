import {
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import MenuItem from "./UI/MenuItem";

const AppLayout = ({ children }: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const menuItems = [
    <MenuItem
      icon={<HomeIcon />}
      text={"Dashboard"}
      href="/dashboard"
      isExpanded={isExpanded}
    />,
    <MenuItem
      icon={<CogIcon />}
      text={"Settings"}
      href="/settings"
      isExpanded={isExpanded}
    />,
    <MenuItem
      icon={<UserIcon />}
      text={"Profile"}
      href="/profile"
      isExpanded={isExpanded}
    />,
  ];

  return (
    <main className="h-screen w-screen">
      {/* Header */}
      <header
        className={`fixed top-0 z-40 h-[60px] shadow-md duration-300 bg-white border-b border-gray-200 ${
          isExpanded
            ? "left-[220px] w-[calc(100vw-220px)]"
            : "left-[80px] w-[calc(100vw-80px)]"
        }`}
      >
        <div className="h-full flex flex-row justify-between items-center px-5">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="size-10 p-2 rounded-md duration-300 hover:text-blue-600 hover:bg-gray-100"
          >
            <Bars3BottomLeftIcon />
          </button>
          <div className="flex gap-1">
            <button className="size-10 p-2 rounded-md duration-300 hover:text-blue-600 hover:bg-gray-100">
              <CogIcon />
            </button>
            <button className="size-10 p-2 rounded-md duration-300 hover:text-blue-600 hover:bg-gray-100">
              <UserIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen overflow-y-auto z-50 bg-white border-r border-gray-200 shadow-lg duration-300 ${
          isExpanded ? "w-[220px]" : "w-[80px]"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-1.5">
          <img
            src="https://placehold.co/150x120"
            className="w-full rounded-lg"
          />
        </div>

        {/* Menu Items */}
        <ul className="space-y-1.5 p-1.5">
          {menuItems.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </ul>
      </aside>

      {/* Content */}
      <div
        className={`absolute top-[60px] duration-300 p-5 ${
          isExpanded ? "left-[220px]" : "left-[80px]"
        }`}
      >
        {children}
      </div>
    </main>
  );
};

export default AppLayout;
