
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PopulationFormValues } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface Props {
  form: UseFormReturn<PopulationFormValues>;
}

type District = Database["public"]["Tables"]["districts"]["Row"];

const DistrictSelector = ({ form }: Props) => {
  const selectedRegion = form.watch('region_id');
  
  console.log('Selected Region:', selectedRegion); // Debug log

  const { data: districts, isLoading } = useQuery({
    queryKey: ['districts', selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      
      console.log('Fetching districts for region:', selectedRegion); // Debug log
      
      const { data, error } = await supabase
        .from('districts')
        .select('id, name')
        .eq('region_id', selectedRegion)
        .order('name');
      
      if (error) {
        console.error('Error fetching districts:', error);
        throw error;
      }
      
      console.log('Fetched districts:', data); // Debug log
      return data as District[];
    },
    enabled: !!selectedRegion
  });

  // Reset district when region changes
  React.useEffect(() => {
    if (selectedRegion) {
      console.log('Resetting district selection for new region:', selectedRegion); // Debug log
      form.setValue('district_id', '');
    }
  }, [selectedRegion, form]);

  return (
    <FormField
      control={form.control}
      name="district_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>District</FormLabel>
          <Select 
            onValueChange={(value) => {
              console.log('District selected:', value); // Debug log
              field.onChange(value);
            }} 
            value={field.value}
            disabled={isLoading || !selectedRegion}
          >
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="bg-white z-50"
              position="popper"
              sideOffset={4}
            >
              {districts?.map((district) => (
                <SelectItem 
                  key={district.id} 
                  value={district.id}
                  className="hover:bg-gray-100"
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
  );
};

export default DistrictSelector;
