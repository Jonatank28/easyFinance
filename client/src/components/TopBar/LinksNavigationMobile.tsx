import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { links } from "@/data/linksNavigation"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const LinksNavigationMobile = () => {
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="flex lg:hidden">
          <AlignJustify />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {links.map((link) => (
          <Link
            className={`${pathName === link.route ? "font-bold text-primary" : "text-muted-foreground hover:bg-accent hover:text-white"} rounded-sm px-3 py-1 `}
            key={link.name}
            onClick={() => {
              router.push(link.route + `?year=${year}&&month=${month}`)
              setIsOpen(false)
            }}
            href={link.route + `?year=${year}&&month=${month}`}
          >
            {link.name}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default LinksNavigationMobile