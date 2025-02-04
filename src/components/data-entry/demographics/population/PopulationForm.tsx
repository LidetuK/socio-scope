import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { populationFormSchema, type PopulationFormValues } from "./types";
import RegionSelector from "./RegionSelector";
import DistrictSelector from "./DistrictSelector";
import { supabase } from "@/integrations/supabase/client";

const PopulationForm = () => {
  const form = useForm<PopulationFormValues>({
    resolver: zodResolver(populationFormSchema),
    defaultValues: {
      region: "",
      district: "",
      locality: "",
      totalPopulation: 0,
      malePopulation: 0,
      femalePopulation: 0,
      otherPopulation: 0,
      ageGroups: {
        "0-4": 0,
        "5-9": 0,
      },
    },
  });

  const onSubmit = async (values: PopulationFormValues) => {
    try {
      const { error } = await supabase
        .from('population_distribution')
        .insert([{
          ...values,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      toast.success("Population data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving population data:', error);
      toast.error("Failed to save population data");
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RegionSelector form={form} />
            <DistrictSelector form={form} />
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="locality" className="block text-sm font-medium text-gray-700">
                Locality
              </label>
              <Input
                id="locality"
                placeholder="Enter locality name"
                {...form.register("locality")}
              />
            </div>

            <div>
              <label htmlFor="totalPopulation" className="block text-sm font-medium text-gray-700">
                Total Population
              </label>
              <Input
                id="totalPopulation"
                type="number"
                {...form.register("totalPopulation", { valueAsNumber: true })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="malePopulation" className="block text-sm font-medium text-gray-700">
                  Male
                </label>
                <Input
                  id="malePopulation"
                  type="number"
                  {...form.register("malePopulation", { valueAsNumber: true })}
                />
              </div>
              <div>
                <label htmlFor="femalePopulation" className="block text-sm font-medium text-gray-700">
                  Female
                </label>
                <Input
                  id="femalePopulation"
                  type="number"
                  {...form.register("femalePopulation", { valueAsNumber: true })}
                />
              </div>
              <div>
                <label htmlFor="otherPopulation" className="block text-sm font-medium text-gray-700">
                  Other
                </label>
                <Input
                  id="otherPopulation"
                  type="number"
                  {...form.register("otherPopulation", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Age Groups</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age0-4" className="block text-sm font-medium text-gray-700">
                    0-4 years
                  </label>
                  <Input
                    id="age0-4"
                    type="number"
                    {...form.register("ageGroups.0-4", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <label htmlFor="age5-9" className="block text-sm font-medium text-gray-700">
                    5-9 years
                  </label>
                  <Input
                    id="age5-9"
                    type="number"
                    {...form.register("ageGroups.5-9", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Submit Data
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PopulationForm;