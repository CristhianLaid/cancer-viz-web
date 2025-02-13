import { FC } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";

import { DropdownMenuItem, DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/avatar";
import { Badge } from "@/ui/shadcn/badge";

import DropdownSample from "@/ui/components/dropdown/DropdownSample";
import DropdownItemHref from "@/ui/components/dropdown/DropdownItemHref";

interface UserDropdownProps {
  user: { username: string; image?: string };
  selectedRole: string;
  roles: string[];
  handleRoleChange: (role: string) => void;
  logout: () => void;
}

export const UserDropdown: FC<UserDropdownProps> = ({
  user,
  selectedRole,
  roles,
  handleRoleChange,
  logout,
}) => {
  return (
    <DropdownSample
      trigger={
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="w-9 h-9 border border-gray-300">
            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.username || "Usuario"} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
              {user?.username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:rotate-180" />
        </div>
      }
    >
      {/* Información del usuario */}
      <div className="px-4 py-3 bg-gray-50">
        <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant="secondary" className="text-xs px-2 py-1">{selectedRole}</Badge>
        </div>
      </div>

      <DropdownMenuSeparator />

      {/* Cambio de roles */}
      {roles.length > 0 && (
        <>
          {roles.map((role) => (
            <DropdownMenuItem key={role} onClick={() => handleRoleChange(role)} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              {role}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
        </>
      )}

      {/* Opciones de perfil y cierre de sesión */}
      <DropdownItemHref title="Perfil" icon={<User className="w-4 h-4 mr-2 text-gray-600" />} href="/profile" />
      <DropdownItemHref title="Cerrar sesión" icon={<LogOut className="w-4 h-4 mr-2" />} onClick={logout} />
    </DropdownSample>
  );
};
