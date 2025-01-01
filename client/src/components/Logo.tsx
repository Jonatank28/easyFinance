import Link from "next/link"
import DefaultIcon from "./DefaultIcon"

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <DefaultIcon name="CircleDollarSign" size={20} color="#0d450e" />
      <h1 className="text-xs">Easy Finance</h1>
    </Link>
  )
}

export default Logo