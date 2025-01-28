import { motion } from "framer-motion";
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
    <motion.button
      onClick={openSidebar}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 md:hidden flex items-center gap-2"
      aria-label="Abrir filtros"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Menu className="w-5 h-5 text-gray-700" />
      <span className="text-sm font-medium text-gray-700">Filtros</span>
    </motion.button>
  );
};
