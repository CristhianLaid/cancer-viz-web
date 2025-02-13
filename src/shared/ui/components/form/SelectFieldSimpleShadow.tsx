"use client";

import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/shadcn/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";

interface SelectFieldSimpleShadowProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  options: { id: string | number; name: string }[];
}

const SelectFieldSimpleShadow: React.FC<SelectFieldSimpleShadowProps> = ({ control, name, label, placeholder, options }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="border-gray-300 shadow-md rounded-lg">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white shadow-lg rounded-lg">
              {options.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectFieldSimpleShadow;
