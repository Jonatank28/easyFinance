import DefaultButton from '@/components/DefaultButton';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();


const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });

  const onGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      const redirectUrl = Linking.createURL('/(auth)');
      const oAuthFlow = await googleOAuth.startOAuthFlow({
        redirectUrl,
      });

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
        setIsLoading(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    }
  }, [])

  return (
    <View className='h-screen w-screen flex items-center justify-center p-2'>
      <DefaultButton
        title='Entrar com Google'
        icon='logo-google'
        onPress={onGoogleSignIn}
        isLoading={isLoading}
      />
    </View>
  );
};


export default SignIn;