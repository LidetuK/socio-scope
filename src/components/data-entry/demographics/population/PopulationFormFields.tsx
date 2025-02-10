
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PopulationFormValues } from "./types";
import { NumberField } from "../../shared/FormFields";
import RegionSelector from "./RegionSelector";
import DistrictSelector from "./DistrictSelector";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  form: UseFormReturn<PopulationFormValues>;
}

const PopulationFormFields = ({ form }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegionSelector form={form} />
        <DistrictSelector form={form} />
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
          name="totalPopulation"
          label="Total Population"
          placeholder="Enter total population"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberField
            form={form}
            name="malePopulation"
            label="Male"
            placeholder="Enter male population"
          />
          <NumberField
            form={form}
            name="femalePopulation"
            label="Female"
            placeholder="Enter female population"
          />
          <NumberField
            form={form}
            name="otherPopulation"
            label="Other"
            placeholder="Enter other population"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Age Groups</h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              form={form}
              name="ageGroups.0-4"
              label="0-4 years"
              placeholder="Enter population"
            />
            <NumberField
              form={form}
              name="ageGroups.5-9"
              label="5-9 years"
              placeholder="Enter population"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopulationFormFields;
