import { UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import DefaultIcon from "../DefaultIcon";

const ButtonUser = () => {
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2">
        <p className="text-sm hidden lg:block">{user?.fullName}</p>
        <div className="w-7 h-7">
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label={theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                labelIcon={theme === 'dark' ? <DefaultIcon name="Sun" size={12} /> : <DefaultIcon name="Moon" size={12} />}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </div>
  )
}

export default ButtonUser