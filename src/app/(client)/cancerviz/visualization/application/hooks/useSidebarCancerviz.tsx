import { useState } from "react";

export const useSidebarCancerviz = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  return { isOpen, toggleSidebar, closeSidebar, openSidebar };
};
