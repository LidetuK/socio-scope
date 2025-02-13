
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

type Region = Database["public"]["Tables"]["regions"]["Row"];

const RegionSelector = ({ form }: Props) => {
  const { data: regions, isLoading } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('regions')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data as Region[];
    }
  });

  return (
    <FormField
      control={form.control}
      name="region_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Region</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              {regions?.map((region) => (
                <SelectItem 
                  key={region.id} 
                  value={region.id}
                  className="hover:bg-gray-100"
                >
                  {region.name}
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

export default RegionSelector;
