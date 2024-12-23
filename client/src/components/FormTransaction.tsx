import { UseFormReturn } from "react-hook-form"
import { Form } from "./ui/form"
import DefaultInput from "./forms/DefaultInput"
import DefaultSelect from "./forms/DefaultSelect"
import { transactionTypes } from "@/data/transactionTypes"
import DefaultInpuDate from "./forms/DefaultInpuDate"

const FormTransaction = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Form  {...form}>
      <form className="space-y-2">
        <DefaultInput
          form={form}
          label="Nome"
          name="name"
        />
        <DefaultInput
          form={form}
          label="Valor"
          name="value"
          mask="currency"
          type="number"
        />
        <DefaultSelect
          form={form}
          label="Tipo"
          name="type"
          options={transactionTypes}
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