import { Box, Container, Link as CLink, Text, Divider } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Box bg="white" width="100%" as="header">
        <Container
          maxW="container.xl"
          display="flex"
          justifyContent="space-between"
          py={4}
        >
          <CLink fontWeight="bold" fontSize="2xl" as={Link} href="/">
            Afiliados
          </CLink>
          <Box
            as="ul"
            display="flex"
            justifyContent="center"
            alignItems="center"
            listStyleType="none"
            m={0}
            p={0}
          >
            <Box as="li" mx={2}>
              <CLink fontSize="1xl" as={Link} href="/">
                Transações
              </CLink>
            </Box>
            <Box as="li" mx={2}>
              <CLink
                fontSize="1xl"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sair
              </CLink>
            </Box>
          </Box>
        </Container>
        <Divider />
      </Box>
    );
  }

  return (
    <Box bg="white" width="100%" as="header">
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
        py={4}
      >
        <CLink fontWeight="bold" fontSize="2xl" as={Link} href="/login">
          Afiliados
        </CLink>
        <Box
          as="ul"
          display="flex"
          justifyContent="center"
          alignItems="center"
          listStyleType="none"
          m={0}
          p={0}
        >
          <Box as="li" mx={2}>
            <CLink fontSize="1xl" as={Link} href="/login">
              Login
            </CLink>
          </Box>
        </Box>
      </Container>
      <Divider />
    </Box>
  );
}
