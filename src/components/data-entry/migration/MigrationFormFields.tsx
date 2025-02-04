import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";

interface MigrationFormFieldsProps {
  form: UseFormReturn<any>;
}

const regions = [
  { value: "Banadir", label: "Banadir" },
  { value: "Puntland", label: "Puntland" },
  { value: "Somaliland", label: "Somaliland" },
  { value: "Galmudug", label: "Galmudug" },
  { value: "Hirshabelle", label: "Hirshabelle" },
  { value: "Jubaland", label: "Jubaland" },
  { value: "South West State", label: "South West State" }
];

const MigrationFormFields = ({ form }: MigrationFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="region"
          label="Region"
          options={regions}
        />
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Internal Migration</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            form={form}
            name="ruralToUrban"
            label="Rural-to-Urban"
          />
          <NumberField
            form={form}
            name="urbanToRural"
            label="Urban-to-Rural"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">International Migration</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            form={form}
            name="emigration"
            label="Emigration"
          />
          <NumberField
            form={form}
            name="immigration"
            label="Immigration"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Refugee and IDP Counts</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField
            form={form}
            name="refugeeCount"
            label="Refugee Count"
          />
          <NumberField
            form={form}
            name="idpCount"
            label="IDP Count"
          />
        </div>
      </div>
    </div>
  );
};

export default MigrationFormFields;