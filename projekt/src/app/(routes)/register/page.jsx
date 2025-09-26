import RegisterForm from "@/components/pages/register/form";

export const metadata = {
  title: 'Register'
};

export default function RegisterPage(){

  return(
    <>
    <h1 className="sr-only">Register</h1>

    <RegisterForm/>
    </>
  )
}