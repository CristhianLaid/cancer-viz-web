"use client"

import { useSidebarCancerviz } from "../hooks/useSidebarCancerviz";
import { BackdropCancerviz } from "./views/sidebar/BackdropCancerviz";
import { MobileToggleButtonCancerviz } from "./views/sidebar/MobileToggleButtonCancerviz";
import { SidebarCancerviz } from "./views/sidebar/SidebarCancerviz";

interface SidebarContainerProps {
  ComponentselecteFilters: React.ReactNode
  onResetFilters: () => void
}

export const SidebarConteinerCancerviz = ({
  ComponentselecteFilters,
  onResetFilters
}: SidebarContainerProps) => {
  const { isOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebarCancerviz(true);

  return (
    <>
      <BackdropCancerviz isOpen={isOpen} closeSidebar={closeSidebar} />
      <MobileToggleButtonCancerviz isOpen={isOpen} openSidebar={openSidebar} />
      <SidebarCancerviz
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        ComponentselecteFilters={ComponentselecteFilters} onResetFilters={onResetFilters}      />
    </>
  );
};
