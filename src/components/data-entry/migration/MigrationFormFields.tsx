
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";
import { supabase } from "@/integrations/supabase/client";

interface MigrationFormFieldsProps {
  form: UseFormReturn<any>;
}

const MigrationFormFields = ({ form }: MigrationFormFieldsProps) => {
  const [regions, setRegions] = useState<{ value: string; label: string; }[]>([]);
  const [districts, setDistricts] = useState<{ value: string; label: string; }[]>([]);
  const selectedRegion = form.watch("region_id");

  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase
        .from('regions')
        .select('id, name')
        .order('name');
      
      if (error) {
        console.error('Error fetching regions:', error);
        return;
      }

      setRegions(data.map(region => ({
        value: region.id,
        label: region.name
      })));
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedRegion) {
        setDistricts([]);
        return;
      }

      const { data, error } = await supabase
        .from('districts')
        .select('id, name')
        .eq('region_id', selectedRegion)
        .order('name');
      
      if (error) {
        console.error('Error fetching districts:', error);
        return;
      }

      setDistricts(data.map(district => ({
        value: district.id,
        label: district.name
      })));
    };

    fetchDistricts();
    // Reset district when region changes
    form.setValue("district_id", "");
  }, [selectedRegion]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="region_id"
          label="Region"
          options={regions}
        />
        <SelectField
          form={form}
          name="district_id"
          label="District"
          options={districts}
          disabled={!selectedRegion}
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
