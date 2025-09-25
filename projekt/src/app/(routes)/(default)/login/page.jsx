import LoginForm from "@/components/pages/login/form";

export const metadata = {
  title: 'Login'
};

function LoginPage() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="sr-only">Login</h1>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;