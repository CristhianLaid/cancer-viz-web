import { FC } from "react";
import { NavItem } from "./NavItem";

const navLinks = [
  { href: "/cancerviz/visualization/graphs", label: "Gráficas" },
  { href: "/cancerviz/visualization/samples", label: "Muestras" },
];

export const NavbarLinks: FC = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        {navLinks.map((navLink) => (
          <NavItem {...navLink} key={navLink.label} />
        ))}
      </ul>
    </nav>
  );
};
