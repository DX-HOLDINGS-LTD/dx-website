import { supabase } from "@/integrations/supabase/client";
import {
  WaitlistSubmissionSchema,
  type WaitlistInput,
  type WaitlistResponse,
} from "./waitlist-schema";

export async function saveWaitlistSubmission(data: WaitlistInput): Promise<WaitlistResponse> {
  const validation = WaitlistSubmissionSchema.safeParse(data);
  if (!validation.success) {
    const errors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") errors[field] = issue.message;
    }
    return { success: false, message: "Please correct the errors in the form.", errors };
  }
  const v = validation.data;
  const record = {
    id: crypto.randomUUID(),
    full_name: v.fullName,
    phone: v.phone,
    email: v.email.toLowerCase(),
    region: null as string | null,
    use_case: v.useCase,
    created_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("waitlist").insert({ ...record, source: "website" });
  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        duplicate: true,
        message:
          "You're already on the waitlist! We have your spot reserved and will email you with early access updates.",
      };
    }
    return { success: false, message: "Could not save your registration. Please try again." };
  }
  return {
    success: true,
    message:
      "You're officially on the DX waiting list. We'll keep you updated as we get closer to launch.",
    record,
  };
}
