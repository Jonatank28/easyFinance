import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ButtonUser = () => {
  const [client, setClient] = useState(false);
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="flex justify-end">
      {!client ? (
        <div className="flex items-center gap-1">
          <Skeleton className="w-32 h-5 bg-accent" />
          <div className="w-7 h-7">
            <Skeleton className="w-full h-full rounded-full bg-accent" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
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
  )
}

export default ButtonUser