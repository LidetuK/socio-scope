
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";

interface MigrationFormFieldsProps {
  form: UseFormReturn<any>;
}

const regions = [
  { value: "banadir", label: "Banadir" },
  { value: "puntland", label: "Puntland" },
  { value: "somaliland", label: "Somaliland" },
  { value: "galmudug", label: "Galmudug" },
  { value: "hirshabelle", label: "Hirshabelle" },
  { value: "jubaland", label: "Jubaland" },
  { value: "south_west", label: "South West State" }
];

const MigrationFormFields = ({ form }: MigrationFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="region_id"
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
            name="refugee_count"
            label="Refugee Count"
          />
          <NumberField
            form={form}
            name="idp_count"
            label="IDP Count"
          />
        </div>
      </div>
    </div>
  );
};

export default MigrationFormFields;
