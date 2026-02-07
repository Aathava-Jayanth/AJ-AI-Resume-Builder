import { z } from "zod";
import { useResumeStore } from "@/store/resumeStore";

export const resumeTool = {

  name: "updateResume",

  description:
    "Update resume fields when user provides personal/professional info",

  tool: async (data: any) => {

    useResumeStore.getState().update(data);

    return { success: true };
  },

  inputSchema: z.object({

    name: z.string().optional(),
    role: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),

    city: z.string().optional(),
    state: z.string().optional(),

    summary: z.string().optional(),
    education: z.string().optional(),
    skills: z.string().optional(),
    experience: z.string().optional(),
    projects: z.string().optional(),

    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }),

  outputSchema: z.object({
    success: z.boolean(),
  }),
};
