import useLoading from "@/hooks/useLoading"
import { Button } from "./ui/button"

interface Props {
  title: string
  titleLoading?: string
  onClick: () => void
}

const ButtonSubmit = ({ title, titleLoading, onClick }: Props) => {
  const { isLoading } = useLoading()
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? titleLoading : title}
    </Button>
  )
}

export default ButtonSubmit