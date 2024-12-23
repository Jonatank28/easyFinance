'use client'

import { Bot } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import DefaultModal from "./DefaultModal"

const ReportIA = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variant='ghost' className="font-bold" onClick={() => setIsOpen(!isOpen)}>
        Relatótio IA
        <Bot />
      </Button>
      <DefaultModal
        title="Relatótio IA"
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        description="Você atingiu o limite de 3 relatórios gratuitos. Considere assinar o plano premium para continuar usando esta funcionalidade."
        footer={
          <>
            <Button variant='ghost' onClick={() => setIsOpen(!isOpen)}>
              Fechar
            </Button>
            <Button onClick={() => { }}>
              Gerar relatório
            </Button>
          </>
        }
      >
      </DefaultModal>
    </>
  )
}

export default ReportIA