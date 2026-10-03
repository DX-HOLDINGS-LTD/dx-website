import { z } from "zod";

export const GambianRegions = [
  "Banjul",
  "Kanifing",
  "West Coast",
  "North Bank",
  "Lower River",
  "Central River",
  "Upper River",
  "Outside The Gambia",
] as const;

export const WaitlistUseCases = [
  "Forex",
  "Freelancing",
  "Online Business",
  "International Payments",
  "Digital Assets",
  "Personal Use",
  "Other",
] as const;

export const WaitlistSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters).")
    .max(100, "Full name cannot exceed 100 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,18}$/, "Please enter a valid phone number (e.g. +220 338 4626)."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(255, "Email address is too long."),
  useCase: z.enum(WaitlistUseCases, {
    errorMap: () => ({ message: "Please select your main use." }),
  }),
});

export type WaitlistInput = z.infer<typeof WaitlistSubmissionSchema>;

export interface WaitlistRecord {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  region: string | null;
  use_case: string;
  created_at: string;
}

export type WaitlistResponse =
  | { success: true; message: string; record: WaitlistRecord }
  | { success: false; duplicate?: boolean; message: string; errors?: Record<string, string> };
