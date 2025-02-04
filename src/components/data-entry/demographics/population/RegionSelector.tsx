import React from "react";
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

const regions = [
  "Banadir",
  "Puntland",
  "Somaliland",
  "Galmudug",
  "Hirshabelle",
  "Jubaland",
  "South West State",
  "Middle Shabelle",
  "Lower Juba",
  "Gedo",
  "Bay"
];

interface Props {
  form: UseFormReturn<PopulationFormValues>;
}

const RegionSelector = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Region</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              {regions.map((region) => (
                <SelectItem 
                  key={region} 
                  value={region}
                  className="hover:bg-gray-100"
                >
                  {region}
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