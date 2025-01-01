import useGetParams from "@/hooks/useGetParams"
import useDashboard from "@/hooks/useDashboard"
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useUser } from "@clerk/nextjs"
import { useTransactions } from "@/hooks/useTransactions"
import { usePathname } from "next/navigation"

const GetDataProviders = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  const params = useGetParams()
  const pathName = usePathname()
  const { setUser } = useAuth()
  const { getDataDashboard } = useDashboard()
  const { getDataTransactions } = useTransactions()

  const callsGets = () => {
    if (!user || !params.month || !params.year) return

    if (pathName === "/dashboard") {
      getDataDashboard(user.id, params.month, params.year)
      getDataTransactions(user.id, params.month, params.year)
    } else {
      getDataTransactions(user.id, params.month, params.year)
      getDataDashboard(user.id, params.month, params.year)
    }
  }

  useEffect(() => {
    if (user && user?.id && params.month && parseInt(params.month) > 0 && params.year) {
      callsGets()

      const formatDataUser = {
        userId: user.id,
        name: user.fullName || "",
        email: user.emailAddresses[0].emailAddress,
        photo: user.imageUrl
      }
      setUser(formatDataUser)
    }
  }, [user?.id, params.month, params.year, getDataDashboard, getDataTransactions, setUser, pathName])

  return (
    <>
      {children}
    </>
  )
}

export default GetDataProviders
