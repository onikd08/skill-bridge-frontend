import { LoginForm } from "@/components/ui/auth/login-form";

export const metadata = {
  title: "Login - SkillBridge",
  description: "Login to SkillBridge",
};

const LoginPage = () => {
  return (
    <div className="mx-auto max-w-2xl mt-16">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
