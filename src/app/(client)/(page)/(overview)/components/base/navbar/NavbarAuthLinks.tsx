import Link from "next/link";

export const NavbarAuthLinks = () => (
    <div className="flex space-x-4">
      <Link href="/login" className="text-sm text-primary">
        Iniciar sesión
      </Link>
      <Link href="/signup" className="text-sm text-primary">
        Registrarse
      </Link>
    </div>
  );