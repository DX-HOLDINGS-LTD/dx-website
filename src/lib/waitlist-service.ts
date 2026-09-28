import {
  WaitlistSubmissionSchema,
  type WaitlistInput,
  type WaitlistRecord,
  type WaitlistResponse,
} from "./waitlist-schema";

const STORAGE_KEY = "dx_waitlist_records";

export function getClientWaitlistRecords(): WaitlistRecord[] {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as WaitlistRecord[];
  } catch (e) {
    console.error("Failed to read waitlist records from storage:", e);
    return [];
  }
}

export function saveWaitlistSubmission(data: WaitlistInput): WaitlistResponse {
  // Validate with Zod
  const validation = WaitlistSubmissionSchema.safeParse(data);
  if (!validation.success) {
    const errors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please correct the errors in the form.",
      errors,
    };
  }

  const validData = validation.data;
  const normalizedEmail = validData.email.toLowerCase();

  const existingRecords = getClientWaitlistRecords();
  const existing = existingRecords.find((record) => record.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return {
      success: false,
      duplicate: true,
      message:
        "You're already on the waitlist! We have your spot reserved and will email you with early access updates.",
    };
  }

  // Generate ID safely across browser and server
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `dx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const newRecord: WaitlistRecord = {
    id,
    full_name: validData.fullName,
    phone: validData.phone,
    email: normalizedEmail,
    region: validData.region,
    use_case: validData.useCase,
    created_at: new Date().toISOString(),
  };

  existingRecords.push(newRecord);

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRecords));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  return {
    success: true,
    message:
      "You're officially on the DX waiting list. We'll keep you updated as we get closer to launch.",
    record: newRecord,
  };
}
