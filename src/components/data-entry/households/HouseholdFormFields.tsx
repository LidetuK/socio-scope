
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField, TextField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          form={form}
          name="region"
          label="Region"
        />
        <TextField
          form={form}
          name="district"
          label="District"
        />
      </div>

      <TextField
        form={form}
        name="locality"
        label="Locality (Optional)"
      />

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
