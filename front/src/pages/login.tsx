import Head from "next/head";
import LoginForm from "src/features/auth/components/LoginForm";
import AuthLayout from "src/features/auth/components/AuthLayout";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout title="Login">
        <LoginForm />
      </AuthLayout>
    </>
  );
}
