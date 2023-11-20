import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser, logIn, signUp } from "@/redux/slices/user-slice";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Text,
  Collapse,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

interface FormValues {
  email: string;
  name: string;
  password: string;
}

const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

export default function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { loading } = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  return (
    <Flex w="100%" minH="80vh">
      <Flex borderWidth="1px" borderRadius="lg" m="auto" h="fit-content" p="5%">
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={async ({ email, name, password }: FormValues) => {
            const response = isLogin
              ? await dispatch(logIn({ email, password }))
              : await dispatch(signUp({ email, name, password }));
            const sessionData = {
              email: response.payload.email,
              name: response.payload.name,
              id: response.payload.id,
            };
            localStorage.setItem("session", JSON.stringify(sessionData));
            router.push("/");
            return;
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={validateEmail}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Collapse in={!isLogin}>
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="name"
                        isRequired={!isLogin}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Collapse>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="password"
                      type="password"
                      isRequired={true}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={loading}
                type="submit"
              >
                {isLogin ? "LogIn" : "Sign Up"}
              </Button>
              <Text
                w="100%"
                textAlign="center"
                mt="20px"
                cursor="pointer"
                _hover={{ color: "blue.100" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {`${!isLogin ? "LogIn" : "Sign Up"} instead`}
              </Text>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
}
