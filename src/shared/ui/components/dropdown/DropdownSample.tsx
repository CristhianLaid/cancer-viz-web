import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { FC, ReactNode } from "react";

interface DropdownSampleProps {
  trigger: ReactNode;
  children: ReactNode; 
  align?: "start" | "center" | "end";
  className?: string;
}

const DropdownSample: FC<DropdownSampleProps> = ({ trigger, children, align = "end", className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={`w-60 rounded-lg shadow-lg bg-white border border-gray-200 ${className}`}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSample;
