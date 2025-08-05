import { Link, useLocation } from "react-router";

interface MenuProps {
  icon: any;
  text: string;
  href: string;
  isExpanded: boolean;
}

const MenuItem = ({ icon, text, href, isExpanded }: MenuProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={href}
      className={`flex flex-row items-center h-10 rounded-lg px-4 gap-3 duration-300 ${
        pathname == href
          ? "bg-blue-50 text-blue-600 shadow-md shadow-gray-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
      } ${!isExpanded && "justify-center"}`}
    >
      <div className="size-5">{icon}</div>
      {isExpanded && (
        <span className="line-clamp-1 text-sm overflow-ellipsis">{text}</span>
      )}
    </Link>
  );
};

export default MenuItem;
