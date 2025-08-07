import { Link, useLocation } from "react-router";

interface MenuProps {
  icon: any;
  text: string;
  href: string;
  isExpanded: boolean;
}

const MenuItem = ({ icon, text, href, isExpanded }: MenuProps) => {
  const { pathname } = useLocation();

  const isActive = pathname === href;

  return (
    <div className="relative group">
      <Link
        to={href}
        className={`flex flex-row items-center h-10 rounded-lg px-4 gap-3.5 duration-300 border ${
          isActive
            ? "bg-indigo-50 text-indigo-600 font-medium border-indigo-100"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 border-transparent"
        } ${!isExpanded && "justify-center"}`}
      >
        <div className="size-5">{icon}</div>
        {isExpanded && (
          <span className="line-clamp-1 text-sm overflow-ellipsis">{text}</span>
        )}
      </Link>

      {/* Tooltip when collapsed */}
      {!isExpanded && (
        <div
          className={`
            absolute left-full top-1/2 -translate-y-1/2 ml-3.5
            whitespace-nowrap rounded-md bg-black text-white text-xs
            px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 delay-75 shadow-lg z-50
          `}
        >
          <div className="bg-black absolute -left-[0.25px] top-1/2 -translate-y-1/2 size-4 rotate-45 -z-1" />
          {text}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
