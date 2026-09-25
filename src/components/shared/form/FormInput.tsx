import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import FormErrorHandler from "./FormErrorHandler";

export interface IFormInput {
  id: string;
  name: string;
  type?: string;
  required: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  variant?: "flushed" | "outline";
  setFieldValue?: (arg: string, value: unknown) => void;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  [x: string]: unknown;
}

const FormInput: React.FC<IFormInput> = ({
  required,
  label,
  placeholder,
  setFieldValue,
  handleChange,
  id,
  name,
  type,
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
      <Input
        type={type}
        variant={isOutline ? "outline" : "flushed"}
        placeholder={placeholder}
        aria-label={label || placeholder}
        focusBorderColor={isOutline ? "secondary.500" : "secondary.700"}
        borderColor={isOutline ? "blackAlpha.100" : "#F6D170"}
        bg={isOutline ? "secondary.100" : undefined}
        borderRadius={isOutline ? "lg" : undefined}
        h={isOutline ? "3rem" : undefined}
        fontSize="md"
        value={value}
        onChange={
          setFieldValue
            ? (e) => {
                setFieldValue(id || name, e.target.value);
              }
            : handleChange
        }
      />
      <Box mb={4}>
        <FormErrorHandler error={error} />
      </Box>
    </FormControl>
  );
};

export default FormInput;
