import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { maskCurrency } from "@/lib/masks";

interface Props {
  form: UseFormReturn<any>
  name: string
  label: string
  mask?: "currency"
  type?: HTMLInputElement['type'];
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const DefaultInput = ({ form, name, label, mask, type, disabled, onChange }: Props) => {

  const handleInputChange = (value: any, fieldOnChange: (value: string | number) => void) => {
    let maskedValue: string;

    switch (mask) {
      case 'currency':
        maskedValue = maskCurrency(value.length === 0 ? '0,00' : value);
        break;
      default:
        maskedValue = value;
    }

    fieldOnChange(maskedValue);
    if (onChange) {
      onChange(maskedValue);
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:w-auto ">
          <div className="pb-1">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <div>
              <Input
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange(value, field.onChange);
                }}
                inputMode={(mask === 'currency' || type === 'number') ? 'tel' : 'text'}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
};

export default DefaultInput;