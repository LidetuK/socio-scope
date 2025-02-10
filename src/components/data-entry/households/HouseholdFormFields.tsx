
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface HouseholdFormFieldsProps {
  form: UseFormReturn<any>;
}

const householdTypes = [
  { value: "single_family", label: "Single-family" },
  { value: "multi_family", label: "Multi-family" }
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
];

const employmentOptions = [
  { value: "employed", label: "Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "self_employed", label: "Self-employed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" }
];

const HouseholdFormFields = ({ form }: HouseholdFormFieldsProps) => {
  // Fetch regions
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("id, name");
      if (error) throw error;
      return data;
    }
  });

  // Fetch districts based on selected region
  const { data: districts } = useQuery({
    queryKey: ["districts", form.watch("region_id")],
    queryFn: async () => {
      if (!form.watch("region_id")) return [];
      const { data, error } = await supabase
        .from("districts")
        .select("id, name")
        .eq("region_id", form.watch("region_id"));
      if (error) throw error;
      return data;
    },
    enabled: !!form.watch("region_id")
  });

  // Reset district when region changes
  useEffect(() => {
    form.setValue("district_id", "");
  }, [form.watch("region_id")]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="region_id"
          label="Region"
          options={regions?.map(region => ({
            value: region.id,
            label: region.name
          })) || []}
        />
        <SelectField
          form={form}
          name="district_id"
          label="District"
          options={districts?.map(district => ({
            value: district.id,
            label: district.name
          })) || []}
          disabled={!form.watch("region_id")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          form={form}
          name="householdSize"
          label="Household Size"
        />
        <SelectField
          form={form}
          name="householdType"
          label="Household Type"
          options={householdTypes}
        />
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Head of Household Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            form={form}
            name="headAge"
            label="Age"
          />
          <SelectField
            form={form}
            name="headGender"
            label="Gender"
            options={genderOptions}
          />
          <SelectField
            form={form}
            name="headEmploymentStatus"
            label="Employment Status"
            options={employmentOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseholdFormFields;
