
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { PopulationFormValues } from "./types";
import { NumberField } from "../../shared/FormFields";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: UseFormReturn<PopulationFormValues>;
}

const PopulationFormFields = ({ form }: Props) => {
  // Fetch regions
  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("id, name")
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch districts based on selected region
  const { data: districts = [] } = useQuery({
    queryKey: ["districts", form.watch("region_id")],
    queryFn: async () => {
      const selectedRegionId = form.watch("region_id");
      if (!selectedRegionId) return [];
      
      const { data, error } = await supabase
        .from("districts")
        .select("id, name")
        .eq("region_id", selectedRegionId)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: !!form.watch("region_id")
  });

  // Reset district when region changes
  useEffect(() => {
    if (form.watch("region_id")) {
      form.setValue("district_id", "");
    }
  }, [form.watch("region_id")]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="region_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white z-50">
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                disabled={!form.watch("region_id")}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white z-50">
                  {districts.map((district) => (
                    <SelectItem 
                      key={district.id} 
                      value={district.id}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="locality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Locality (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter locality name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <NumberField
          form={form}
          name="total_population"
          label="Total Population"
          placeholder="Enter total population"
        />

        <div className="grid grid-cols-3 gap-4">
          <NumberField
            form={form}
            name="male_count"
            label="Male"
            placeholder="Enter male population"
          />
          <NumberField
            form={form}
            name="female_count"
            label="Female"
            placeholder="Enter female population"
          />
          <NumberField
            form={form}
            name="other_count"
            label="Other"
            placeholder="Enter other population"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Age Groups</h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              form={form}
              name="age_0_4_years"
              label="0-4 years"
              placeholder="Enter population"
            />
            <NumberField
              form={form}
              name="age_5_9_years"
              label="5-9 years"
              placeholder="Enter population"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationFormFields;
