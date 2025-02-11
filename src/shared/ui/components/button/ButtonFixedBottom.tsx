import { Button } from "@/ui/shadcn/button";
import { motion } from "motion/react";

interface IButtonFixedButton {
  aria_label: string;
  icon: React.ComponentType<{ className: string }>;
  name: string;
  onClick?: () => void;
}
export const ButtonFixedButton = ({
  aria_label,
  name,
  icon: Icon,
  onClick
}: IButtonFixedButton) => {
  return (
    <Button 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 custom:hidden flex items-center gap-2"
      aria-label={aria_label}
      onClick={onClick}
    >
      <motion.div
        initial={{ rotate: -90 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <Icon className="w-5 h-5 text-gray-700" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-medium text-gray-700"
      >
        {name}
      </motion.span>
    </Button>
  );
};
