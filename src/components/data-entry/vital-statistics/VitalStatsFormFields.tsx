import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";

interface VitalStatsFormFieldsProps {
  form: UseFormReturn<any>;
}

const VitalStatsFormFields = ({ form }: VitalStatsFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberField
          form={form}
          name="birthRate"
          label="Birth Rate"
        />
        <NumberField
          form={form}
          name="deathRate"
          label="Death Rate"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          form={form}
          name="infantMortalityRate"
          label="Infant Mortality Rate"
        />
        <NumberField
          form={form}
          name="maternalMortalityRate"
          label="Maternal Mortality Rate"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          form={form}
          name="fertilityRate"
          label="Fertility Rate"
        />
        <NumberField
          form={form}
          name="marriageRate"
          label="Marriage Rate"
        />
        <NumberField
          form={form}
          name="divorceRate"
          label="Divorce Rate"
        />
      </div>
    </div>
  );
};

export default VitalStatsFormFields;