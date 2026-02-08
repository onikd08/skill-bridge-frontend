"use client";

import {
  createTutorProfile,
  updateTutorProfile,
} from "@/actions/tutor/tutor.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { User } from "better-auth";
import { use } from "react";
import { toast } from "sonner";
import * as z from "zod";

export const tutorProfileSchema = z.object({
  bio: z.string().max(500).optional(),
  subject: z.string().min(3, "Subject is required"),
  hourlyRate: z.number().min(1, "Hourly rate must be greater than 0"),
  isFeatured: z.boolean(),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});
type Category = {
  id: string;
  name: string;
};

export type TutorProfile = {
  bio?: string | null;
  subject: string;
  hourlyRate: number;
  isFeatured: boolean;
  tutorCategories: { categoryId: string }[];
};

type Props = {
  mode: "create" | "update";
  categories: Category[];
  tutorProfile?: TutorProfile;
  user: User;
};

export function TutorProfileForm({
  mode,
  categories,
  tutorProfile,
  user,
}: Props) {
  const isUpdate = mode === "update";

  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: tutorProfile?.bio ?? "",
      subject: tutorProfile?.subject ?? "",
      hourlyRate: tutorProfile?.hourlyRate ?? 0,
      isFeatured: tutorProfile?.isFeatured ?? false,
      categoryIds:
        tutorProfile?.tutorCategories?.map((c) => c.categoryId) ?? [],
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        isUpdate ? "Updating profile..." : "Creating profile...",
      );

      try {
        if (isUpdate) {
          const payload = {
            ...value,
            tutorCategories: value.categoryIds.map((id) => ({
              categoryId: id,
            })),
          };
          await updateTutorProfile(payload);
        } else {
          const payload = {
            ...value,
            tutorCategories: value.categoryIds.map((id) => ({
              categoryId: id,
            })),
          };
          await createTutorProfile(payload);
        }

        toast.success(
          isUpdate
            ? "Profile updated successfully"
            : "Profile created successfully",
          { id: toastId },
        );
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isUpdate ? "Edit Tutor Profile" : "Create Tutor Profile"}
        </CardTitle>
        <CardDescription>
          {isUpdate
            ? "Update your tutor information"
            : "Set up your tutor profile"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="tutor-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input value={field.state.value} readOnly />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input value={field.state.value} readOnly />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
            {/* Subject */}
            <form.Field name="subject">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Subject</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Bio */}
            <form.Field name="bio">
              {(field) => (
                <Field>
                  <FieldLabel>Bio</FieldLabel>
                  <textarea
                    className="w-full rounded-md border p-2 text-sm"
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Hourly Rate */}
            <form.Field name="hourlyRate">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Hourly Rate ($)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Featured */}
            <form.Field name="isFeatured">
              {(field) => (
                <Field>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                    Featured Tutor
                  </label>
                </Field>
              )}
            </form.Field>

            {/* Categories */}
            <form.Field name="categoryIds">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Categories</FieldLabel>

                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={field.state.value.includes(category.id)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...field.state.value, category.id]
                                : field.state.value.filter(
                                    (id) => id !== category.id,
                                  );

                              field.handleChange(next);
                            }}
                          />
                          {category.name}
                        </label>
                      ))}
                    </div>

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button className="w-full" form="tutor-profile-form" type="submit">
          {isUpdate ? "Save Changes" : "Create Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TutorProfileForm;
