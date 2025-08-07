import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

interface MenuProps {
  icon: any;
  text: string;
  isExpanded: boolean;
  children: any;
}

const SubMenuItem = ({ icon, text, isExpanded, children }: MenuProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const hoverTimeoutRef = useRef<any>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsActive(false);
    children.forEach((item: any) => {
      if (pathname === item.props.href) {
        setIsActive(true);
      }
    });
  }, [pathname]);

  useEffect(() => {
    if (!isExpanded) setShowSubMenu(false);
    else if (isActive) setShowSubMenu(true);
  }, [isExpanded, isActive]);

  const handleMouseEnter = () => {
    if (!isExpanded) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        setShowSubMenu(true);
      }, 250);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        setShowSubMenu(false);
      }, 250);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up any pending timeout on unmount
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => setShowSubMenu((prev) => !prev)}
        className={`flex flex-row justify-between items-center h-10 rounded-lg px-4 duration-300 cursor-pointer ${
          isActive
            ? "text-indigo-600 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        } ${!isExpanded && "justify-center"}`}
      >
        <div className="flex gap-3 items-center">
          <div className="size-5">{icon}</div>
          {isExpanded && (
            <span className="line-clamp-1 text-sm overflow-ellipsis">
              {text}
            </span>
          )}
        </div>

        {isExpanded && (
          <div className="size-3">
            {showSubMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        )}
      </div>

      {isExpanded && showSubMenu && (
        <div className="pl-3 space-y-1">{children}</div>
      )}

      {/* Tooltip when sidebar collapsed */}
      {!isExpanded && showSubMenu && (
        <div
          className={`
            absolute left-full top-1/2 -translate-y-1/2 ml-3.5
            whitespace-nowrap rounded-md bg-white text-xs border border-gray-200
            p-1 shadow-lg z-50
          `}
        >
          <div className="bg-white absolute -left-[0.25px] top-1/2 -translate-y-1/2 size-4 rotate-45 -z-1" />
          <div className="space-y-1" onClick={() => setShowSubMenu(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubMenuItem;
