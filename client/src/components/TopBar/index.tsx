'use client'

import { useTheme } from "next-themes";
import ButtonUser from "./ButtonUser";
import Logo from "../Logo";
import LinksNavigations from "./LinksNavigation";
import DateSelect from "../DateSelect";
import LinksNavigationMobile from "./LinksNavigationMobile";

const TopBar = () => {
  const { theme } = useTheme()
  return (
    <div className="fixed top-0 w-full">
      <header className="border-b-2" key={theme} >
        <div className="grid grid-cols-3 items-center py-4 defaultWidth">
          {/* Logo e links de navegaço */}
          <div className="items-center gap-10 hidden lg:flex">
            <Logo />
            <LinksNavigations />
          </div>
          {/* Botão de menu mobile */}
          <LinksNavigationMobile />
          {/* Configurar mes e ano / data */}
          <DateSelect />
          {/* Botão de ação do usuario */}
          <ButtonUser />
        </div>
      </header>
    </div>
  )
}

export default TopBar