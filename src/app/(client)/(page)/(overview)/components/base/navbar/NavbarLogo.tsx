import { Dna } from "lucide-react";
import Link from "next/link";

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Dna className="w-6 h-6 text-primary" />
      <span className="text-xl font-semibold text-foreground">Cancer Viz</span>
    </Link>
  );
};
