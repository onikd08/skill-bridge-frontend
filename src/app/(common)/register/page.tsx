import { RegisterForm } from "@/components/ui/auth/register-form";

export const metadata = {
  title: "Register - SkillBridge",
  description: "Register to SkillBridge",
};

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) => {
  const { role } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl mt-16">
      <RegisterForm role={role}></RegisterForm>
    </div>
  );
};

export default RegisterPage;
