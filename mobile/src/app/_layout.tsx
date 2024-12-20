import { router, Slot } from "expo-router";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "@/storage/tokenCache";
import "../../global.css";

const InitialLayout = () => {
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      router.replace("/(auth)")
    } else {
      router.replace("/(public)")
    }
  }, [isLoaded, isSignedIn])

  return (
    isLoaded ? <Slot /> : <ActivityIndicator className="flex-1 items-center justify-center text-black bg-red-600" />
  );
}


const layoutRoot = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider >
  );
};

export default layoutRoot;
