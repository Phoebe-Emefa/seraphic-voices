"use client";

import SuccessModal from "@/components/contact/SuccessModal";
import CustomButton from "@/components/shared/CustomButton";
import FormTextArea from "@/components/shared/form/FormTextArea";
import FormInput from "@/components/shared/form/FormInput";
import type { ContactFormContent } from "@/lib/contactPageContent";
import { contactSchema } from "@/lib/contactSchema";
import { Box, Grid, GridItem, Heading, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Formik } from "formik";

export interface IContact {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  subject?: string;
}

const ContactForm = ({ form }: { form: ContactFormContent }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    subject: form.emailSubject,
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const onSubmit = async (values: IContact, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("failed");
      }
      resetForm();
      onOpen();
    } catch {
      if (form.errorMessage) {
        toast({
          title: form.errorMessage,
          status: "error",
          isClosable: true,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      w="full"
      minW={0}
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.50"
      boxShadow="0 24px 48px -28px rgba(4, 35, 92, 0.25)"
    >
      {form.title ? (
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="secondary.700"
          letterSpacing="-0.02em"
          mb={2}
        >
          {form.title}
        </Heading>
      ) : null}
      {form.intro ? (
        <Text fontSize="sm" color="secondary.700" opacity={0.75} mb={8} lineHeight={1.6}>
          {form.intro}
        </Text>
      ) : null}

      <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          setFieldTouched,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={5}>
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))" }} gap={5}>
                <GridItem minW={0}>
                  <FormInput
                    name="firstName"
                    id="firstName"
                    label="First name"
                    placeholder="Jane"
                    variant="outline"
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    error={touched.firstName ? (errors.firstName as string) : undefined}
                    value={values.firstName}
                    touched={touched.firstName}
                    required
                  />
                </GridItem>
                <GridItem minW={0}>
                  <FormInput
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    placeholder="Mensah"
                    variant="outline"
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    error={touched.lastName ? (errors.lastName as string) : undefined}
                    value={values.lastName}
                    touched={touched.lastName}
                    required
                  />
                </GridItem>
              </Grid>
              <FormInput
                type="email"
                name="email"
                id="email"
                label="Email"
                placeholder="you@example.com"
                variant="outline"
                onChange={handleChange}
                handleBlur={handleBlur}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                error={touched.email ? (errors.email as string) : undefined}
                value={values.email}
                touched={touched.email}
                required
              />
              <FormTextArea
                name="message"
                id="message"
                label="Message"
                placeholder="How can we help?"
                variant="outline"
                onChange={handleChange}
                handleBlur={handleBlur}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                error={touched.message ? (errors.message as string) : undefined}
                value={values.message}
                touched={touched.message}
                required
              />
            </VStack>
            {form.submitLabel ? (
              <Box mt={8}>
                <CustomButton
                  title={form.submitLabel}
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting || !dirty}
                />
              </Box>
            ) : null}
          </form>
        )}
      </Formik>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        title={form.successTitle}
        message={form.successMessage}
        closeLabel={form.successCloseLabel}
      />
    </Box>
  );
};

export default ContactForm;
