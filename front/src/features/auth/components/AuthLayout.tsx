import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from "@chakra-ui/react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Box
      as="main"
      flex="1"
      bg="gray.100"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        <Card>
          <CardHeader>
            <Heading size="md">{title}</Heading>
          </CardHeader>
          <CardBody>{children}</CardBody>
        </Card>
      </Container>
    </Box>
  );
}
