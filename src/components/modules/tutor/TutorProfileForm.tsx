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
import { Badge } from "@/components/ui/badge";
import { useForm } from "@tanstack/react-form";
import { Star } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

export const tutorProfileSchema = z.object({
  bio: z.string().max(500),
  experience: z.number().min(0, "Experience must be 0 or more"),
  hourlyRate: z.number().min(1, "Hourly rate must be greater than 0"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type Category = {
  id: string;
  categoryName: string;
};

export type TutorProfile = {
  bio?: string | null;
  experience: number;
  hourlyRate: number;
  isFeatured: boolean;
  categories: Category[];
  totalReviews: number;
  averageRating: number;
};

type Props = {
  mode: "create" | "update";
  categories: Category[];
  tutorProfile?: TutorProfile;
  user: any;
};

export function TutorProfileForm({ mode, categories, tutorProfile }: Props) {
  const isUpdate = mode === "update";

  const form = useForm({
    defaultValues: {
      bio: tutorProfile?.bio ?? "",
      experience: tutorProfile?.experience ?? 0,
      hourlyRate: tutorProfile?.hourlyRate ?? 0,
      categories: tutorProfile?.categories?.map((c) => c.id) ?? [],
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        isUpdate ? "Updating profile..." : "Creating profile...",
      );

      try {
        const payload = {
          ...value,
          categories: value.categories.map((id) => id),
        };

        if (isUpdate) {
          await updateTutorProfile(payload);
        } else {
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
    <Card className="max-w-2xl mx-auto shadow-xl border-0 rounded-2xl">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl font-bold">
          {isUpdate ? "Edit Tutor Profile" : "Create Tutor Profile"}
        </CardTitle>
        <CardDescription>
          {isUpdate
            ? "Update your tutor information"
            : "Set up your tutor profile"}
        </CardDescription>

        {/* ⭐ Rating Summary (Update Mode Only) */}
        {isUpdate && tutorProfile && (
          <div className="flex items-center gap-3 pt-2">
            <Badge className="px-3 py-1 text-sm flex items-center gap-1 bg-yellow-100 text-yellow-700 border-yellow-300">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              {tutorProfile.averageRating.toFixed(1)}
            </Badge>

            <span className="text-sm text-muted-foreground">
              {tutorProfile.totalReviews} Reviews
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form
          id="tutor-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-6">
            {/* Bio */}
            <form.Field name="bio">
              {(field) => (
                <Field>
                  <FieldLabel>Bio</FieldLabel>
                  <textarea
                    className="w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    rows={4}
                    placeholder="Tell students about yourself..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Experience */}
            <form.Field name="experience">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Experience (Years)</FieldLabel>
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

            {/* Categories */}
            <form.Field name="categories">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel>Categories</FieldLabel>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-2 text-sm p-2 rounded-md border hover:bg-muted transition"
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
                          {category.categoryName}
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
        <Button
          className="w-full rounded-xl text-base py-5"
          form="tutor-profile-form"
          type="submit"
        >
          {isUpdate ? "Save Changes" : "Create Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TutorProfileForm;
