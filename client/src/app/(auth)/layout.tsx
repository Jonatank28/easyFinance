import TopBar from "@/components/TopBar"

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <TopBar />
      {children}
    </main>
  )
}

export default AuthRootLayout