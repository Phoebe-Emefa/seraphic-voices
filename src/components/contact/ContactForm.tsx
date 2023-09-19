import {
  Box,
  Grid,
  GridItem,
  Heading,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import CustomButton from "@/components/shared/CustomButton";
import FormTextArea from "@/components/shared/form/FormTextArea";
import FormInput from "@/components/shared/form/FormInput";
import SuccessModal from "@/components/contact/SuccessModal";

export interface IContact {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  subject?: string;
}

const MessageSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required!"),
  lastName: Yup.string().required("Last Name is Required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  message: Yup.string().required("Message is Required!"),
});

const ContactForm = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    subject: "TEF Website Message",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };
  const onSubmit = async (
    _values: IContact,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(_values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();

      onOpen();
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
    } catch (error: any) {
      toast({
        title: `An Error Occured`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading
        as="h6"
        fontSize="xl"
      >
        Send us a Message
      </Heading>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={MessageSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
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
              <VStack align="left" spacing={8} mt={12}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <FormInput
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      error={errors?.firstName as string}
                      value={values?.firstName}
                      touched={touched?.firstName}
                      required={true}
                    />
                  </GridItem>
                  <GridItem>
                    <FormInput
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      error={errors?.lastName as string}
                      value={values?.lastName}
                      touched={touched?.lastName}
                      required={true}
                    />
                  </GridItem>
                </Grid>

                <FormInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  error={errors?.email as string}
                  value={values?.email}
                  touched={touched?.email}
                  required={true}
                />

                <FormTextArea
                  name="message"
                  id="message"
                  placeholder="How can we help?"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  error={errors?.message as string}
                  value={values?.message}
                  touched={touched?.message}
                  required={true}
                />
              </VStack>
              <Box mt={10}>
                <CustomButton
                  title="Submit"
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting || !isEmpty(errors) || !dirty}
                />
              </Box>
            </form>
          )}
        </Formik>
        <SuccessModal isOpen={isOpen} onClose={onClose} />
      </>
    </Box>
  );
};

export default ContactForm;
