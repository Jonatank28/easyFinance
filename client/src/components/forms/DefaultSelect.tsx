import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
  label?: string;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: {
    key: string;
    label: string;
  }[];
  disabled?: boolean
}

const DefaultSelect = ({ form, label, name, options, onChange, placeholder, disabled }: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <div className="pb-1">
            <FormLabel>{label}</FormLabel>
          </div>
          <Select
            disabled={disabled}
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.key}
                  value={option.key}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DefaultSelect;