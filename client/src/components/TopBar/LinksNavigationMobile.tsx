import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { links } from "@/data/linksNavigation"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import useGetParams from "@/hooks/useGetParams"
import DefaultIcon from "../DefaultIcon"

const LinksNavigationMobile = () => {
  const pathName = usePathname()
  const router = useRouter()
  const params = useGetParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="flex lg:hidden">
          <DefaultIcon name="AlignJustify" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col z-50">
        {links.map((link) => (
          <Link
            className={`${pathName === link.route ? "font-bold text-primary" : "text-muted-foreground hover:bg-accent hover:text-white"} rounded-sm px-3 py-1 `}
            key={link.name}
            onClick={() => {
              router.push(link.route + `?year=${params.year}&&month=${params.month}`)
              setIsOpen(false)
            }}
            href={link.route + `?year=${params.year}&&month=${params.month}`}
          >
            {link.name}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default LinksNavigationMobile