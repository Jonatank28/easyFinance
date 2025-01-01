import React from 'react';
import * as Lucide from 'lucide-react';

type IconeNome = keyof typeof Lucide;

type Props = {
  name?: IconeNome
  size?: number;
  color?: string
  className?: string
};

const DefaultIcon = ({ name = 'Home', size, color, className }: Props) => {
  const IconComponent = Lucide[name];

  if (!IconComponent) {
    return null;
  }
  // @ts-ignore // Problema ao tipar o lucide
  return <IconComponent size={size} color={color} className={className} />;
};

export default DefaultIcon;
