import { useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Api from "../const/api";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../const/routes";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleShowClick() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (!login) {
      setError("Login required");
    }

    if (!password) {
      setError("Password required");
    }

    try {
      const res = await Api.Auth.signIn({ login, password });
      const { authorization, "x-refresh-token": refreshToken } = res.headers;  
      window.localStorage.setItem("accessToken", authorization);
      window.localStorage.setItem("refreshToken", refreshToken);

      navigate(AppRoutes.Root); 
    } catch (e) {
      setError(e.response?.data?.message ?? "Something went wrong");
    }
  }

  return (
    <Flex width="100vw" height="100vh" backgroundColor="black">
      <Flex
        width="100vw"
        height="100vh"
        backgroundColor="#151336aa"
        boxShadow="8px 8px 24px 0px rgba(66, 68, 90, 1)"
        padding={5}
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Avatar bg="orange" />
        <Heading>Sign in to Boxes</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt width={5} />}
                  />
                  <Input id="login" placeholder="Login" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLock width={5} />}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="orange"
                width="full"
              >
                Sign In
              </Button>
              {error && <Text color="red">{error}</Text>}
            </Stack>
          </form>
        </Box>
        <Box>
          Don't have account yet?{" "}
          <Link color="orange" href="/signup">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
