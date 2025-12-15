import z from "zod"

export const formatZodError = (error: z.ZodError) => {
  const issue = error.issues[0];
  const path = issue.path.join(".");
  return `${path} — ${issue.message}`;
};
