"use client";

import { UserRole } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Briefcase,
  GraduationCap, 
  Megaphone,
  Users
} from "lucide-react";

interface UserRoleSelectorProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export function UserRoleSelector({ role, setRole }: UserRoleSelectorProps) {
  const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
    {
      value: "professional",
      label: "Professional",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
    },
    {
      value: "educator",
      label: "Educator",
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
    },
    {
      value: "marketer",
      label: "Marketer",
      icon: <Megaphone className="h-4 w-4 mr-2" />,
    },
    {
      value: "student",
      label: "Student",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">Deck Style:</span>
      <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center">
                {role.icon}
                {role.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}