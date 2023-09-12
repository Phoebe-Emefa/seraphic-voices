import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import FormErrorHandler from './FormErrorHandler';

export interface IFormInput {
  id: string;
  name: string;
  type?: string;
  required: boolean;
  placeholder?: string;
  error?: string;
  value?: string;
  setFieldValue?: (arg: string, value: unknown) => void;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  [x: string]: unknown;
}

const FormInput: React.FC<IFormInput> = ({
  required,
  placeholder,
  setFieldValue,
  handleChange,
  id,
  name,
  type,
  error,
  value,
  ...props
}) => {
  return (
    <FormControl
      id={(id || props?.name) as string}
      isRequired={props?.value ? false : required}
    >
      <Input
        type={type}
        variant="flushed"
        placeholder={placeholder}
        focusBorderColor="secondary.700"
        borderColor="#F6D170"
        value={value}
        onChange={
          setFieldValue
            ? e => {
                setFieldValue(id || name, e?.target?.value);
              }
            : handleChange
        }
      />
      <Box mb={4}>
        <FormErrorHandler error={error as string} />
      </Box>
    </FormControl>
  );
};

export default FormInput;
