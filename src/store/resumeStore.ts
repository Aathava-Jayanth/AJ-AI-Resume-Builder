import { create } from "zustand";

type ResumeData = {

  name: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  state: string;

  summary: string;
  education: string;
  skills: string;
  experience: string;
  projects: string;

  linkedin: string;
  github: string;
  portfolio: string;

  update: (data: Partial<ResumeData>) => void;
};

export const useResumeStore = create<ResumeData>((set) => ({

  name: "",
  role: "",
  email: "",
  phone: "",
  city: "",
  state: "",

  summary: "",
  education: "",
  skills: "",
  experience: "",
  projects: "",

  linkedin: "",
  github: "",
  portfolio: "",

  update: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
