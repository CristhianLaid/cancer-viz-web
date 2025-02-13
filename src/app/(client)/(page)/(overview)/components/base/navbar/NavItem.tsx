import Link from "next/link";

interface INavItemProps {
  href:     string;
  label:    string;
}

export const NavItem = ({ href, label }: INavItemProps) => {
  return (
    <li>
      <Link
        className="text-sm font-medium text-gray-500 hover:text-black"
        href={href}
      >
        {label}
      </Link>
    </li>
  );
};
