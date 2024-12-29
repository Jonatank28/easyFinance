import { UseFormReturn } from "react-hook-form"
import { Form } from "./ui/form"
import DefaultInput from "./forms/DefaultInput"
import DefaultSelect from "./forms/DefaultSelect"
import { transactionTypes } from "@/data/transactionTypes"
import DefaultInpuDate from "./forms/DefaultInpuDate"
import { TypesCategories } from "./ButtonAddTransaction"

interface Props {
  form: UseFormReturn<any>
  data: TypesCategories
}

const FormTransaction = ({ form, data }: Props) => {
  const typeSelected = form.watch('type') as keyof TypesCategories;

  const onChangeType = (value: string) => {
    if (value) {
      form.setValue('categoryId', '');
    }
  }

  return (
    <Form  {...form}>
      <form className="space-y-2">
        <DefaultInput
          form={form}
          label="Descrição"
          name="description"
        />
        <DefaultSelect
          form={form}
          label="Tipo"
          name="type"
          onChange={onChangeType}
          options={transactionTypes}
        />
        <DefaultSelect
          key={typeSelected}
          disabled={!typeSelected}
          form={form}
          label="Categoria"
          name="categoryId"
          options={data[typeSelected] || []}
        />
        <DefaultInput
          form={form}
          label="Valor"
          name="value"
          mask="currency"
          type="number"
        />
        <DefaultInpuDate
          form={form}
          label="Data"
          name="date"
        />
      </form>
    </Form>
  )
}

export default FormTransaction