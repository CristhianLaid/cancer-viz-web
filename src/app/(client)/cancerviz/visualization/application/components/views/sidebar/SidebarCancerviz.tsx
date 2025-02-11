import { Button } from "@/ui/shadcn/button";
import { Filter, X } from "lucide-react";
import { motion } from "framer-motion";

export const SidebarCancerviz = ({
  isOpen,
  toggleSidebar,
  ComponentselecteFilters,
  onResetFilters
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  ComponentselecteFilters?: React.ReactNode;
  onResetFilters: () => void;
}) => {
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "0" }}
      exit={{ x: "-100%" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={`
        fixed custom:sticky top-0 z-20 
        h-screen
        bg-white 
        shadow-lg md:shadow-none
        ${isOpen ? "w-[250px]" : "w-0 md:w-20"}
        overflow-hidden
      `}
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
            onClick={() => toggleSidebar()}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {isOpen && (
          <>
            {ComponentselecteFilters}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6"
            >
              <Button
                variant="outline"
                onClick={onResetFilters}
                className="w-full"
              >
                <X className="w-5 h-5 mr-2 text-gray-500" />
                Restablecer filtros
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </motion.aside>
  );
};
