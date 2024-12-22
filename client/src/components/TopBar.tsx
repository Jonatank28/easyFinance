'use client'

import { UserButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
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

const TopBar = () => {
  const [client, setClient] = useState(false);
  const { user } = useUser()
  const pathName = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <header className="border-b-2" key={theme}>
      <div className="flex items-center justify-between py-4 defaultWidth">
        <div className="flex items-center gap-10">
          <p>Logo</p>
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
        </div>
        <div>
          {!client ? (
            <div className="flex items-center gap-1">
              <Skeleton className="w-32 h-5 bg-accent" />
              <div className="w-7 h-7">
                <Skeleton className="w-full h-full rounded-full bg-accent" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p className="text-sm">{user?.fullName}</p>
              <div className="w-7 h-7">
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label={theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                      labelIcon={theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar