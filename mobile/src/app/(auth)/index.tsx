import DefaultButton from '@/components/DefaultButton';
import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text } from 'react-native';

const home = () => {
  const { signOut } = useAuth()
  const { user } = useUser()
  return (
    <View>
      <Text>Olá usuario: {user?.fullName}</Text>
      <Text>Email: {user?.emailAddresses[0].emailAddress}</Text>
      <DefaultButton title='Sair' icon='exit' onPress={() => signOut()} />
    </View>
  );
};

export default home;