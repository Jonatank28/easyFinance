import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const index = async () => {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }


  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <SignIn
        signUpUrl="/dashboard"
      />
    </main >
  );
};

export default index;