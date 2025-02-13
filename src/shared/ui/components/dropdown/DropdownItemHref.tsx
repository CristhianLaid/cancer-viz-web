import { FC, ReactNode } from "react";
import Link from "next/link";
import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";

interface DropdownItemHrefProps {
  title: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const DropdownItemHref: FC<DropdownItemHrefProps> = ({ title, icon, href, onClick, className }) => {
  if (href) {
    return (
      <DropdownMenuItem asChild>
        <Link href={href} className="flex items-center px-4 py-2 hover:bg-gray-100">
          {icon && <span className="w-4 h-4 mr-2">{icon}</span>}
          {title}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={onClick} className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50">
      {icon && <span className="w-4 h-4 mr-2">{icon}</span>}
      {title}
    </DropdownMenuItem>
  );
};

export default DropdownItemHref;

