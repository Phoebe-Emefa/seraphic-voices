import FormErrorHandler from '@/components/shared/form/FormErrorHandler';
import { IFormInput } from '@/components/shared/form/FormInput';
import { Box, FormControl, Textarea } from '@chakra-ui/react';
import React from 'react';

const FormTextArea: React.FC<IFormInput> = ({
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
      <Textarea
        placeholder={placeholder}
        variant="flushed"
        focusBorderColor="secondary.700"
        borderColor="#F6D170"
        value={value}
        onChange={e => {
          if (setFieldValue) {
            setFieldValue(id || name, e.target.value);
          } else if (handleChange) {
            handleChange(e);
          }
        }}
      />
      <Box mb={4}>
        <FormErrorHandler error={error as string} />
      </Box>
    </FormControl>
  );
};

export default FormTextArea;
