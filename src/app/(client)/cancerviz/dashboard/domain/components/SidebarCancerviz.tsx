import { Button } from "@/ui/shadcn/button";
import { Filter, X } from "lucide-react";
import { motion } from "motion/react";

export const SidebarCancerviz = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <motion.aside
      className={`
        fixed md:sticky top-0 z-20 
        h-screen bg-white 
        ${isOpen ? "w-[250px]" : "md:w-20"}
        shadow-lg md:shadow-none
      `}
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      exit={{ x: -250 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2 text-gray-700" />
              Filtros
            </h2>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {isOpen && (
          <div className="mt-6 space-y-6">
            <Button
              variant="outline"
              onClick={() => alert("Filtros restablecidos")}
              className="w-full"
            >
              <X className="w-5 h-5 mr-2 text-gray-500" />
              Restablecer filtros
            </Button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
