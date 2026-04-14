"use client";

import { loginUser } from "@/actions/auth/auth.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Authenticating...");
      try {
        const data = await loginUser(value.email, value.password);
        if (!data.success) {
          return toast.error(data.message, { id: toastId });
        }
        toast.success("Welcome back!", { id: toastId });
        router.push("/");
        router.refresh();
      } catch (error) {
        return toast.error("Connection failed. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[400px] mx-auto px-4"
    >
      <Card
        className={cn(
          "border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Aesthetic Gradient Top Bar */}

        <CardHeader className="space-y-2 pt-10 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access SkillBridge
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-8 pt-4">
          {/* Demo Auto-fill Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <Button
              type="button"
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-0.5 bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all rounded-xl"
              onClick={() => {
                form.setFieldValue("email", "admin@email.com");
                form.setFieldValue("password", "admin1234");
              }}
            >
              <span className="text-xs font-bold text-foreground">Admin Demo</span>
              <span className="text-[10px] text-muted-foreground">admin@email.com</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-0.5 bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all rounded-xl"
              onClick={() => {
                form.setFieldValue("email", "student1@gmail.com");
                form.setFieldValue("password", "12345678");
              }}
            >
              <span className="text-xs font-bold text-foreground">Student Demo</span>
              <span className="text-[10px] text-muted-foreground">student1@gmail.com</span>
            </Button>
          </div>

          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Email Field */}
            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-semibold ml-1"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      className={cn(
                        "pl-11 h-12 rounded-2xl bg-background/50 border-border/50 transition-all focus-visible:ring-indigo-500",
                        field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 &&
                          "border-destructive/50",
                      )}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {/* Error handling fix: Mapping and extracting the message string */}
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[12px] text-destructive font-medium ml-1"
                      >
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0],
                        )}
                      </motion.p>
                    )}
                </div>
              )}
            />

            {/* Password Field */}
            <form.Field
              name="password"
              children={(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-semibold"
                    >
                      Password
                    </Label>
                    <Link
                      href="#"
                      className="text-xs text-primary hover:underline font-bold transition-all"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "pl-11 h-12 rounded-2xl bg-background/50 border-border/50 transition-all focus-visible:ring-indigo-500",
                        field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 &&
                          "border-destructive/50",
                      )}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[12px] text-destructive font-medium ml-1"
                      >
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0],
                        )}
                      </motion.p>
                    )}
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full h-12 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            />
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-transparent px-4 text-muted-foreground">
                New to SkillBridge?
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full h-12 rounded-2xl hover:bg-primary/5 text-primary font-bold transition-colors"
            asChild
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
