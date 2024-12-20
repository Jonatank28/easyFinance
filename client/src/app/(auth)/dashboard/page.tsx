'use client'

import { useUser } from "@clerk/nextjs";

const index = () => {
  const { user } = useUser()
  console.log("🚀  user", user?.firstName);
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export default index;