import { motion } from "framer-motion";

export const BackdropCancerviz = ({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/20 z-10 custom:hidden"
      onClick={closeSidebar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};
