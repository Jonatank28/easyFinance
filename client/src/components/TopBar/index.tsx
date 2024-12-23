'use client'

import { useTheme } from "next-themes";
import ButtonUser from "./ButtonUser";
import Logo from "../Logo";
import LinksNavigations from "./LinksNavigation";
import DateSelect from "../DateSelect";
import LinksNavigationMobile from "./LinksNavigationMobile";
import { Suspense } from "react";

const TopBar = () => {
  const { theme } = useTheme()
  return (
    <div className="fixed top-0 w-full backdrop-blur-3xl lg:backdrop-filter-none">
      <header className="border-b-2" key={theme} >
        <div className="grid grid-cols-3 items-center py-4 defaultWidth">
          {/* Logo e links de navegaço */}
          <div className="items-center gap-10 hidden lg:flex">
            <Logo />
            <Suspense>
              <LinksNavigations />
            </Suspense>
          </div>
          {/* Botão de menu mobile */}
          <Suspense>
            <LinksNavigationMobile />
          </Suspense>
          {/* Configurar mes e ano / data */}
          <Suspense>
            <DateSelect />
          </Suspense>
          {/* Botão de ação do usuario */}
          <ButtonUser />
        </div>
      </header>
    </div>
  )
}

export default TopBar