'use client'

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
import { SelectType } from "@/types/selectType"
import useDashboard from "@/hooks/useDashboard"
import useGetParams from "@/hooks/useGetParams"
import DefaultIcon from "./DefaultIcon"

export interface TypesCategories {
  expense: SelectType[]
  revenue: SelectType[]
  investment: SelectType[]
}


const schema = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z
    .string()
    .min(1, 'O valor deve ser maior que 0')
    .refine((value) => currencyToFloat(value) > 0, {
      message: 'O valor deve ser maior que 0',
    }),
  type: z.string().min(1, { message: 'Campo obrigatório' }),
  categoryId: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.date({
    required_error: "Campo obrigatório",
  }),
})

const ButtonAddTransaction = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { startLoading, stopLoading } = useLoading()
  const [TypesCategories, setTypesCategories] = useState<TypesCategories>({
    expense: [],
    revenue: [],
    investment: [],
  })
  const { user } = useUser()
  const params = useGetParams()
  const { getDataDashboard } = useDashboard()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      value: 'R$ 0,00',
      type: '',
      categoryId: '',
      date: new Date(),
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    startLoading()
    if (!user) {
      return toast.error('Usuário não encontrado')
    }
    const formatData = {
      ...data,
      userId: user?.id,
      value: currencyToFloat(data.value),
    }
    try {
      const res = await api.post('/transaction/create', formatData)
      toast.success(res.data.message)
      if (user && params.month && params.year) {
        getDataDashboard(user?.id, params.month, params.year)
      } else {
        toast.error('Falha ao atualizar dashboard')
      }
      onClose(true)
    } catch (error: unknown) {
      handleError(error)
    } finally {
      stopLoading()
    }
  }

  const onClose = (lag?: boolean) => {
    setIsOpen(false)
    if (lag) {
      setTimeout(() => {
        form.reset()
      }, 500);
    } else {
      form.reset()
    }
  }

  const getData = async () => {
    console.log("chamou o get")
    try {
      const res = await api.get(`/category/getAllByUserId/${user?.id}`)
      setTypesCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      getData()
    }
  }, [isOpen])

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Adicionar transação
        <DefaultIcon name="ArrowUpDown" />
      </Button>
      <DefaultModal
        title="Adicionar transação"
        description="Insira as informações da transação"
        open={isOpen}
        onClose={() => onClose()}
        footer={
          <div className="pt-4 space-x-2">
            <Button variant='ghost' onClick={() => onClose()}>
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
        <FormTransaction form={form} data={TypesCategories} />
      </DefaultModal>
    </>
  )
}

export default ButtonAddTransaction