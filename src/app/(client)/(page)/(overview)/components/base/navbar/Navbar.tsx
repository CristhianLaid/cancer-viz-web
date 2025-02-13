"use client";

import { useState } from "react";

import useAuthStore from "@/ui/store/authStore";
import { Skeleton } from "@/ui/shadcn/skeleton";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { UserDropdown } from "../dropdown/UserDropdown";
import { NavbarAuthLinks } from "./NavbarAuthLinks";


export const Navbar = () => {
  const { user, isAuthenticated, logout, loading, setRole } = useAuthStore();
  const roles = user?.roles || [];
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setRole(role);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row items-center justify-between">
          {/* Logo */}
          <NavbarLogo />

          {/* Navegación */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? <NavbarLinks /> : <NavbarAuthLinks />}

            {/* Usuario autenticado con Dropdown */}
            {loading ? (
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            ) : isAuthenticated ? (
              <UserDropdown
                user={user}
                selectedRole={selectedRole}
                roles={roles}
                handleRoleChange={handleRoleChange}
                logout={logout}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

