"use client";

import { motion } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  UserCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { registerUser } from "@/actions/auth/auth.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    role: z.enum(["STUDENT", "TUTOR"]),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT" as "STUDENT" | "TUTOR",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const { success, message } = await registerUser({
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role,
        });

        if (!success) {
          return toast.error(message, { id: toastId });
        }

        toast.success("Account created! Redirecting to login...", {
          id: toastId,
        });
        router.push("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[450px] mx-auto px-4"
    >
      <Card
        className={cn(
          "border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden",
          className,
        )}
        {...props}
      >
        <CardHeader className="space-y-2 pt-10 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription>
            Join SkillBridge and start your journey
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-4">
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Name Field */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={field.name}
                    className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/70" />
                    <Input
                      id={field.name}
                      placeholder="John Doe"
                      className="pl-11 h-11 rounded-xl bg-background/50 border-border/50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="ml-1 text-[11px] font-medium text-destructive">
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0],
                        )}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={field.name}
                    className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/70" />
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="john@example.com"
                      className="pl-11 h-11 rounded-xl bg-background/50 border-border/50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="ml-1 text-[11px] font-medium text-destructive">
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0],
                        )}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={field.name}
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/70" />
                      <Input
                        id={field.name}
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 h-11 rounded-xl bg-background/50 border-border/50"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </form.Field>

              {/* Confirm Password Field */}
              <form.Field name="confirmPassword">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={field.name}
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Confirm
                    </Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/70" />
                      <Input
                        id={field.name}
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 h-11 rounded-xl bg-background/50 border-border/50"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Global Errors for Passwords */}
            <form.Field name="confirmPassword">
              {(field) =>
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 ? (
                  <p className="ml-1 text-[11px] font-medium text-destructive">
                    {String(
                      field.state.meta.errors[0]?.message ??
                        field.state.meta.errors[0],
                    )}
                  </p>
                ) : null
              }
            </form.Field>

            {/* Role Field */}
            <form.Field name="role">
              {(field) => (
                <div className="space-y-1.5">
                  <Label className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Joining as a...
                  </Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3.5 top-3 h-4 w-4 z-10 text-muted-foreground/70" />
                    <Select
                      value={field.state.value}
                      onValueChange={(value: any) => field.handleChange(value)}
                    >
                      <SelectTrigger className="pl-11 h-11 rounded-xl bg-background/50 border-border/50">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="STUDENT">
                          Student (I want to learn)
                        </SelectItem>
                        <SelectItem value="TUTOR">
                          Tutor (I want to teach)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full h-12 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            />

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
