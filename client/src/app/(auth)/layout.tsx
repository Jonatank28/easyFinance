import TopBar from "@/components/TopBar"

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen">
      <TopBar />
      <div className="h-full pt-[65px]">
        {children}
      </div>
    </main >
  )
}

export default AuthRootLayout