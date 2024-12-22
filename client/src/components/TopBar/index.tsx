'use client'

import { useTheme } from "next-themes";
import ButtonUser from "./ButtonUser";
import Logo from "../Logo";
import LinksNavigations from "./LinksNavigation";
import DateSelect from "../DateSelect";

const TopBar = () => {
  const { theme } = useTheme()
  return (
    <header className="border-b-2" key={theme}>
      <div className="grid grid-cols-3  py-4 defaultWidth">
        {/* Logo e links de navegaço */}
        <div className="flex items-center gap-10">
          <Logo />
          <LinksNavigations />
        </div>
        {/* Configurar mes e ano / data */}
        <DateSelect />
        {/* Botão de ação do usuario */}
        <ButtonUser />
      </div>
    </header>
  )
}

export default TopBar