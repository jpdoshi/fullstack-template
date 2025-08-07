import {
  Bars3BottomLeftIcon,
  CheckBadgeIcon,
  CogIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  HomeIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  UserCircleIcon,
  UsersIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import MenuItem from "./UI/MenuItem";
import SubMenuItem from "./UI/SubMenuItem";
import { useState } from "react";

const AppLayout = ({ children }: any) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    <MenuItem
      icon={<HomeIcon />}
      text={"Dashboard"}
      href="/dashboard"
      isExpanded={isExpanded}
    />,
    <SubMenuItem icon={<UsersIcon />} text={"Clients"} isExpanded={isExpanded}>
      <MenuItem
        icon={<CheckBadgeIcon />}
        text="Client Onboarding"
        href="/onboarding"
      />
      <MenuItem icon={<ListBulletIcon />} text="Clients List" href="/clients" />
      <MenuItem
        icon={<PresentationChartLineIcon />}
        text="Sales Report"
        href="/sales"
      />
    </SubMenuItem>,
    <SubMenuItem
      icon={<CurrencyDollarIcon />}
      text={"Finance"}
      isExpanded={isExpanded}
    >
      <MenuItem icon={<WalletIcon />} text="Expense List" href="/expenses" />
      <MenuItem
        icon={<DocumentCheckIcon />}
        text="Invoice List"
        href="/invoices"
      />
    </SubMenuItem>,
    <MenuItem
      icon={<CogIcon />}
      text={"Settings"}
      href="/settings"
      isExpanded={isExpanded}
    />,
    <MenuItem
      icon={<UserCircleIcon />}
      text={"Profile"}
      href="/profile"
      isExpanded={isExpanded}
    />,
  ];

  return (
    <main className="h-screen w-screen">
      {/* Header */}
      <header
        className={`fixed top-0 z-40 h-[60px] shadow-md duration-300 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 ${
          isExpanded
            ? "left-[220px] w-[calc(100vw-220px)]"
            : "left-[80px] w-[calc(100vw-80px)]"
        }`}
      >
        <div className="h-full flex flex-row justify-between items-center px-5">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="size-8 p-1 rounded-md duration-300 hover:text-indigo-600 border bg-white border-gray-200 hover:bg-indigo-50 hover:border-indigo-200"
          >
            <Bars3BottomLeftIcon />
          </button>
          <div className="flex gap-2">
            <button className="size-8 p-1 rounded-md duration-300 hover:text-indigo-600 hover:bg-indigo-50">
              <CogIcon />
            </button>
            <button className="size-8 p-1 rounded-md duration-300 hover:text-indigo-600 hover:bg-indigo-50">
              <UserCircleIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 bg-white border-r border-gray-200 shadow-lg duration-300 ${
          isExpanded ? "w-[220px]" : "w-[80px]"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-1.5 border-b border-gray-200">
          <img
            src="https://placehold.co/300x210"
            className="w-full rounded-lg"
          />
        </div>

        {/* Menu Items */}
        <ul className="space-y-1.5 p-1.5">
          {menuItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
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
