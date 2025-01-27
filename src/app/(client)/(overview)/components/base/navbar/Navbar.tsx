import { Dna } from "lucide-react";
import Link from "next/link";
import { NavItem } from "./NavItem";


const navLinks = [
  { href: "/cancerviz/dashboard/graphs", label: "Gráficas" },
  { href: "/cancerviz/dashboard/samples", label: "Muestras" },
];

export const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Dna className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">
              Cancer Viz
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {navLinks.map((navLink) =>(
                <NavItem {...navLink} key={navLink.label}/>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
