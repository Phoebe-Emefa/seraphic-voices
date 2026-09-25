import FormErrorHandler from "@/components/shared/form/FormErrorHandler";
import { IFormInput } from "@/components/shared/form/FormInput";
import { Box, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

const FormTextArea: React.FC<IFormInput> = ({
  required,
  label,
  placeholder,
  setFieldValue,
  handleChange,
  id,
  name,
  error,
  value,
  variant = "flushed",
}) => {
  const isOutline = variant === "outline";

  return (
    <FormControl id={id || name} isRequired={required}>
      {label ? (
        <FormLabel fontSize="sm" fontWeight="semibold" color="secondary.700" mb={2}>
          {label}
        </FormLabel>
      ) : null}
      <Textarea
        placeholder={placeholder}
        aria-label={label || placeholder}
        variant={isOutline ? "outline" : "flushed"}
        focusBorderColor={isOutline ? "secondary.500" : "secondary.700"}
        borderColor={isOutline ? "blackAlpha.100" : "#F6D170"}
        bg={isOutline ? "secondary.100" : undefined}
        borderRadius={isOutline ? "lg" : undefined}
        minH={isOutline ? "10rem" : undefined}
        fontSize="md"
        value={value}
        onChange={(e) => {
          if (setFieldValue) {
            setFieldValue(id || name, e.target.value);
          } else if (handleChange) {
            handleChange(e as any);
          }
        }}
      />
      <Box mb={4}>
        <FormErrorHandler error={error} />
      </Box>
    </FormControl>
  );
};

export default FormTextArea;
