import { useSearchParams } from "next/navigation"

const useGetParams = () => {
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const month = searchParams.get("month")

  return { year, month }
}

export default useGetParams