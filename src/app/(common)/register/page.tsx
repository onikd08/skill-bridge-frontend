import { RegisterForm } from "@/components/ui/auth/register-form";

export const metadata = {
  title: "Register - SkillBridge",
  description: "Register to SkillBridge",
};

const RegisterPage = () => {
  return (
    <div className="mx-auto max-w-2xl mt-16">
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default RegisterPage;
