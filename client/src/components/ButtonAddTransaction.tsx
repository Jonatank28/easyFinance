'use client'

import { ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import DefaultModal from "./DefaultModal"
import FormTransaction from "./FormTransaction"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { currencyToFloat } from "@/lib/functions"
import { api } from "@/config/api"
import { toast } from "sonner"
import { handleError } from "@/utils/handleError"
import useLoading from "@/hooks/useLoading"
import ButtonSubmit from "./ButtonSubmit"
import { useUser } from "@clerk/nextjs"

const schema = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
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
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { user } = useUser()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      value: 'R$ 0,00',
      type: '',
      date: new Date(),
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    startLoading()
    const formatData = {
      ...data,
      value: currencyToFloat(data.value),
      categoryId: '676f5503dadab41557c740ae'
    }

    try {
      const res = await api.post('/transaction/create', formatData)
      toast.success(res.data.message)
      onClose()
    } catch (error: unknown) {
      handleError(error)
    } finally {
      stopLoading()
    }
  }

  // {
  //   "description": "Compra de alimentos",
  //   "type": "expense",
  //   "categoryId": "676f5503dadab41557c740ae",
  //   "date": "2024-12-27T00:00:00.000Z",
  //   "value": 150.75
  // }

  const onClose = () => {
    setIsOpen(false)
    form.reset()
  }

  // const getData = async () => {
  //   try {
  //     const res = await api.post('/transaction/create',)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [isOpen])

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
            <ButtonSubmit
              onClick={form.handleSubmit(onSubmit)}
              title="Salvar"
              titleLoading="Salvando..."
            />
          </div>
        }
      >
        <FormTransaction form={form} />
      </DefaultModal>
    </>
  )
}

export default ButtonAddTransaction