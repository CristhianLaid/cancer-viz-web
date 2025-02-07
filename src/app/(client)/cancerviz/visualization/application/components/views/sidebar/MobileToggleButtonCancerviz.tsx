import { ButtonFixedButton } from "@/ui/components/button/ButtonFixedBottom";
import { Menu } from "lucide-react";

export const MobileToggleButtonCancerviz = ({
  isOpen,
  openSidebar,
}: {
  isOpen: boolean;
  openSidebar: () => void;
}) => {
  if (isOpen) return null;

  return (
    <ButtonFixedButton
      name="Filtros"
      aria_label="Abrir filtros"
      icon={Menu}
      onClick={() => openSidebar()}
    />
  );
};
