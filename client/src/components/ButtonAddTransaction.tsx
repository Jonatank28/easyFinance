'use client'

import { ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import DefaultModal from "./DefaultModal"
import FormTransaction from "./FormTransaction"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { currencyToFloat } from "@/lib/functions"

const schema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z
    .string()
    .min(1, 'O valor deve ser maior que 0')
    .refine((value) => currencyToFloat(value) > 0, {
      message: 'O valor deve ser maior que 0',
    }),
  type: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.date({
    required_error: "Campo obrigatório",
  }),
})

const ButtonAddTransaction = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      value: 'R$ 0,00',
      type: '',
      date: new Date(),
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    const formatData = {
      ...data,
      value: currencyToFloat(data.value),
    }
    console.log("🚀  formatData", formatData);
  }

  const onClose = () => {
    setIsOpen(false)
    form.reset()
  }

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Adicionar transação
        <ArrowUpDown />
      </Button>
      <DefaultModal
        title="Adicionar transação"
        description="Insira as informações da transação"
        open={isOpen}
        onClose={onClose}
        footer={
          <div className="pt-4 space-x-2">
            <Button variant='ghost' onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>
              Adicionar
            </Button>
          </div>
        }
      >
        <FormTransaction form={form} />
      </DefaultModal>
    </>
  )
}

export default ButtonAddTransaction