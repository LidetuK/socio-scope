
import { z } from "zod";

// Form validation schema - all fields required except locality
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

// Base type for form values
export type PopulationFormValues = {
  region_id: string;
  district_id: string;
  locality?: string;
  total_population: number;
  male_count: number;
  female_count: number;
  other_count: number;
  age_0_4_years: number;
  age_5_9_years: number;
};

// Database insert type - all fields required except locality
export type PopulationDataInsert = PopulationFormValues & {
  created_by: string;
};
