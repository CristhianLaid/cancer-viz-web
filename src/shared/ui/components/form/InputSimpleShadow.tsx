"use client";

import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";

interface InputSimpleShadowProps {
  control: Control<any>;
  name: string;
  type?: string;
  placeholder?: string;
  label?: string
}

const InputSimpleShadow: React.FC<InputSimpleShadowProps> = ({ control, name, type = "text", placeholder, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="text-gray-700 font-medium">{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSimpleShadow;
