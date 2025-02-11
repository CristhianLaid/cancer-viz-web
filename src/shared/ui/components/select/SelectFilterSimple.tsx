import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/select";


interface FilterOption {
  id: number;
  name: string;
}

interface SelectFilterSimpleProps {
  filterType: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (filterType: string, value: string) => void;
}

export const SelectFilterSimple: React.FC<SelectFilterSimpleProps> = ({
  filterType,
  label,
  placeholder,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex-1 min-w-[200px] lg:max-w-[300px]">
      <label className="block mb-2">{label}</label>
      <Select value={selectedValue} onValueChange={(value) => onChange(filterType, value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">
            Todos
          </SelectItem>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
