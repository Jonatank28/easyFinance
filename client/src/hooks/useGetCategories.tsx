import { api } from "@/config/api"
import { useUser } from "@clerk/nextjs"

const useGetCategories = () => {
  const { user } = useUser()
  const getDataCategories = async () => {
    try {
      const res = await api.get(`/category/getAllByUserId/${user?.id}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  return { getDataCategories }
}

export default useGetCategories