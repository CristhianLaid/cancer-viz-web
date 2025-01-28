"use client"

import { useSidebarCancerviz } from "../../application/hooks/useSidebarCancerviz";
import { BackdropCancerviz } from "./BackdropCancerviz";
import { MobileToggleButtonCancerviz } from "./MobileToggleButtonCancerviz";
import { SidebarCancerviz } from "./SidebarCancerviz";


export const SidebarConteinerCancerviz = () => {
  const { isOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebarCancerviz(true);

  return (
    <>
      <BackdropCancerviz isOpen={isOpen} closeSidebar={closeSidebar} />
      <MobileToggleButtonCancerviz isOpen={isOpen} openSidebar={openSidebar} />
      <SidebarCancerviz isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
