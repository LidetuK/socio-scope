import { z } from "zod";

export const populationFormSchema = z.object({
  region: z.string().min(1, "Region is required"),
  district: z.string().min(1, "District is required"),
  locality: z.string().optional(),
  totalPopulation: z.number().min(0, "Population must be a positive number"),
  malePopulation: z.number().min(0, "Male population must be a positive number"),
  femalePopulation: z.number().min(0, "Female population must be a positive number"),
  otherPopulation: z.number().min(0, "Other population must be a positive number"),
  ageGroups: z.object({
    "0-4": z.number().min(0),
    "5-9": z.number().min(0),
  }),
});

export type PopulationFormValues = z.infer<typeof populationFormSchema>;