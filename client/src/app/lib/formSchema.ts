import { z } from "zod";

// services option json
export const servicesOptions = [
  "UI/UX",
  "Branding",
  "Web Dev",
  "Mobile App",
] as const;

// form Schema
export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Only letters, spaces, apostrophes, or hyphens allowed"
    ),
  email: z.string().email("Invalid email address"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),
  services: z
    .array(z.enum(servicesOptions))
    .nonempty("Select at least one service"),
  budget: z
    .union([z.string(), z.number()])
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const num = typeof val === "string" ? parseInt(val, 10) : val;
        return Number.isInteger(num) && num >= 100 && num <= 1_000_000;
      },
      { message: "Budget must be an integer between 100 and 1,000,000" }
    ),
  projectStartDate: z.string().refine((val) => {
    if (!val) return false;
    const today = new Date();
    const selected = new Date(val);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Date must be today or later"),
 acceptTerms: z
  .boolean()
  .refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export type FormData = z.infer<typeof formSchema>;
