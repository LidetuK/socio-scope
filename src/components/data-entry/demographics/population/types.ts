
import { z } from "zod";

export const populationFormSchema = z.object({
  region_id: z.string().min(1, "Region is required"),
  district_id: z.string().min(1, "District is required"),
  locality: z.string().optional(),
  total_population: z.number().min(0, "Population must be a positive number"),
  male_count: z.number().min(0, "Male population must be a positive number"),
  female_count: z.number().min(0, "Female population must be a positive number"),
  other_count: z.number().min(0, "Other population must be a positive number"),
  age_0_4_years: z.number().min(0),
  age_5_9_years: z.number().min(0),
});

export type PopulationFormValues = z.infer<typeof populationFormSchema>;

// Make all fields required for database insertion
export type PopulationDataInsert = Required<Omit<PopulationFormValues, 'locality'>> & {
  locality?: string;
  created_by: string;
};
