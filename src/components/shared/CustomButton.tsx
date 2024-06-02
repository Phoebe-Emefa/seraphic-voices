import { Button } from '@chakra-ui/react';
import { Any } from 'next-sanity';

import React from 'react';

const CustomButton = ({
  title,
  onClick,
  width,
  height,
  fontSize,
  type,
  isLoading,
  isDisabled,

  ...props
}: {
  title: string;
  onClick?: () => void;
  width?: string;
  height?: number;
  fontSize?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
  isDisabled?: boolean;

}) => {
  return (
    <Button
      bg="secondary.700"
      color="white"
      onClick={onClick}
      fontWeight={700}
      fontSize={fontSize || { base: 'sm', xl: 'lg' }}
      rounded="full"
      height={height || 12}
      width={width || '9rem'}
      colorScheme="none"
      type={type}
      isLoading={isLoading}
      isDisabled={isDisabled}
      {...props}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
