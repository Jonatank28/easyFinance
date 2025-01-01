import DefaultIcon from "@/components/DefaultIcon"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TransactionTypes } from "@/types/transaction";
import DefaultModal from "@/components/DefaultModal";
import { useEffect, useState } from "react";
import ButtonSubmit from "@/components/ButtonSubmit";
import ContentModalDelete from "./ContentModalDelete";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { currencyToFloat, floatToCurrency } from "@/lib/functions";
import { TypesCategories } from "@/components/ButtonAddTransaction";
import useGetCategories from "@/hooks/useGetCategories";
import FormTransaction from "@/components/FormTransaction";

interface IsOpenTypes {
  open: boolean
  type: "edit" | "delete" | ""
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

const Actions = ({ row }: { row: TransactionTypes }) => {
  const [isOpen, setIsOpen] = useState<IsOpenTypes>({
    open: false,
    type: ""
  })
  const [TypesCategories, setTypesCategories] = useState<TypesCategories>({
    expense: [],
    revenue: [],
    investment: [],
  })
  const { getDataCategories } = useGetCategories()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: row.description,
      value: floatToCurrency(row.value),
      type: row.type,
      categoryId: row.categoryId,
      date: new Date(row.date),
    },
  })

  const titleModal = isOpen.type === "edit" ? "Editar transação" : "Excluir transação"
  const titleButtonSubmit = isOpen.type === "edit" ? "Salvar" : "Confirmar"
  const titleButtonSubmitLoading = isOpen.type === "edit" ? "Salvando..." : "Excluindo..."

  const handleOpen = (type: "edit" | "delete") => {
    if (type === "edit") {
      setIsOpen({ open: true, type: "edit" })
    } else if (type === "delete") {
      setIsOpen({ open: true, type: "delete" })
    }
  }

  const handleClose = () => {
    setIsOpen({ open: false, type: "" })
  }

  const handleSubmit = () => {

  }

  useEffect(() => {
    if (isOpen && isOpen.open && isOpen.type === "edit") {
      const res = getDataCategories()
      res.then((data) => {
        setTypesCategories(data)
      })
    }
  }, [isOpen])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DefaultIcon name="MoreHorizontal" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleOpen("edit")}>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleOpen("delete")}>Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isOpen.open &&
        <DefaultModal
          open={isOpen.open}
          title={titleModal}
          onClose={handleClose}
          footer={
            <>
              <Button variant='ghost' onClick={handleClose}>
                Fechar
              </Button>
              <ButtonSubmit
                onClick={handleSubmit}
                title={titleButtonSubmit}
                titleLoading={titleButtonSubmitLoading}
              />
            </>
          }
        >
          {isOpen.type === "delete" && <ContentModalDelete row={row} />}
          {isOpen.type === "edit" && <FormTransaction form={form} data={TypesCategories} />}
        </DefaultModal>
      }
    </>
  )

}

export default Actions