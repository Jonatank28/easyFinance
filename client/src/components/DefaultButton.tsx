import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button } from './ui/button';
import { LoaderCircle } from 'lucide-react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  children?: React.ReactNode
}


const DefaultButton = ({ title, isLoading = false, children }: ButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      className='w-full p-3 rounded-xl'
    >
      {isLoading ? <p>carregando...</p> : (
        <div className='flex-row items-center justify-center gap-2'>
          {children}
          <p>{title}</p>
        </div>
      )}
    </Button>
  );
};


export default DefaultButton;