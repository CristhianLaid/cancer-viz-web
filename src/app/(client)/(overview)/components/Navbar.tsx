import { Dna } from "lucide-react";
import Link from "next/link";

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
              <li>
                <Link className="text-sm font-medium text-gray-500 hover:text-black" href="/cancerviz/dashboard/graphs">Gráficas</Link>
              </li>
              <li>
                <Link className="text-sm font-medium text-gray-500 hover:text-black" href="/cancerviz/dashboard/samples">Muestras</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
