import { links } from "@/data/linksNavigation"
import useGetParams from "@/hooks/useGetParams"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LinksNavigations = () => {
  const pathName = usePathname()
  const params = useGetParams()
  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          className={`${pathName === link.route ? "font-bold text-primary" : "text-muted-foreground hover:bg-accent dark:hover:text-white"} rounded-sm px-3 py-1 `}
          key={link.name}
          href={link.route + `?year=${params.year}&&month=${params.month}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default LinksNavigations