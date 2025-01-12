import useLoading from "@/hooks/useLoading"
import { Button } from "./ui/button"

interface Props {
  title: string
  titleLoading?: string
  onClick: () => void
  variant?: 'default' | 'destructive'
}

const ButtonSubmit = ({ title, titleLoading, onClick, variant = 'default' }: Props) => {
  const { isLoading } = useLoading()
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? titleLoading : title}
    </Button>
  )
}

export default ButtonSubmit