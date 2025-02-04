import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { populationFormSchema, type PopulationFormValues } from "./types";
import PopulationFormFields from "./PopulationFormFields";
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
      const dbValues = {
        region: values.region,
        district: values.district,
        locality: values.locality,
        total_population: values.totalPopulation,
        male_population: values.malePopulation,
        female_population: values.femalePopulation,
        other_population: values.otherPopulation,
        age_groups: values.ageGroups,
        created_by: (await supabase.auth.getUser()).data.user?.id
      };

      const { error } = await supabase
        .from('population_distribution')
        .insert(dbValues);

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
          <PopulationFormFields form={form} />
          
          <div className="flex gap-4">
            <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8b77e5]">
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