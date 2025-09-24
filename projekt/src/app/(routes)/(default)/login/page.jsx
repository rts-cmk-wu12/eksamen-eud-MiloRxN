import LoginForm from "@/components/ui/forms/login-form";

export const metadata = {
  title: 'Login'
};

function LoginPage() {
  return (
    <>
      <h1 className="sr-only">Login</h1>
      <LoginForm />
    </>
  );
}

export default LoginPage;