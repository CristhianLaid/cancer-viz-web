import { Button } from "@/ui/shadcn/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface IButtonLink {
    href:   string;
    label:  string;
    icon:   React.ComponentType<{ className: string }>;
}

export const ButtonLink = ({ label, icon: Icon, href }: IButtonLink) => {
  return (
    <Button asChild className="text-base">
      <Link href={href} className="flex items-center">
        {label}
        <Icon className="ml-2 w-4 h-4" />
      </Link>
    </Button>
  );
};
