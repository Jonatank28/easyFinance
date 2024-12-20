import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const DefaultButton = ({ title, isLoading = false, icon, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading}
      className='bg-slate-950 w-full p-3 rounded-xl'
    >
      {isLoading ? <ActivityIndicator color='white' /> : (
        <View className='flex-row items-center justify-center gap-2'>
          <Ionicons name={icon} size={24} color='white' />
          <Text className='text-white'>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};


export default DefaultButton;