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

const districts = [
  "District 1",
  "District 2",
  "District 3"
];

interface Props {
  form: UseFormReturn<PopulationFormValues>;
}

const DistrictSelector = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="district"
      render={({ field }) => (
        <FormItem>
          <FormLabel>District</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              {districts.map((district) => (
                <SelectItem 
                  key={district} 
                  value={district}
                  className="hover:bg-gray-100"
                >
                  {district}
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