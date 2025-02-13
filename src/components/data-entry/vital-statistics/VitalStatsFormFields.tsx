
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberField } from "../shared/FormFields";
import { SelectField } from "../shared/SelectField";
import { supabase } from "@/integrations/supabase/client";

interface VitalStatsFormFieldsProps {
  form: UseFormReturn<any>;
}

const VitalStatsFormFields = ({ form }: VitalStatsFormFieldsProps) => {
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
  }, [selectedRegion, form]);

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
