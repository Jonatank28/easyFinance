import Link from "next/link"
import { usePathname } from "next/navigation"

type LinksTypes = {
  name: string,
  route: string
}

const links: LinksTypes[] = [
  {
    name: "Dashboard",
    route: "/dashboard"
  },
  {
    name: "Transação",
    route: "/transaction"
  },
  {
    name: "Assinatura",
    route: "/subscription"
  }
]

const LinksNavigations = () => {
  const pathName = usePathname()
  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          className={`${pathName === link.route ? "font-bold text-primary" : "text-muted-foreground hover:bg-accent hover:text-white"} rounded-sm px-3 py-1 `}
          key={link.name}
          href={link.route}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default LinksNavigations