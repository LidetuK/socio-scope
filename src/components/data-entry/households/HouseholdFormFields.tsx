import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField, TextField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";

interface HouseholdFormFieldsProps {
  form: UseFormReturn<any>;
}

const householdTypes = [
  { value: "Single-family", label: "Single-family" },
  { value: "Multi-family", label: "Multi-family" }
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
];

const employmentOptions = [
  { value: "Employed", label: "Employed" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Self-employed", label: "Self-employed" },
  { value: "Student", label: "Student" },
  { value: "Retired", label: "Retired" }
];

const HouseholdFormFields = ({ form }: HouseholdFormFieldsProps) => {
  return (
    <div className="space-y-6">
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