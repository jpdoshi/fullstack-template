import { useState } from "react";

const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return { isExpanded, setIsExpanded };
};

export default useSidebar;
