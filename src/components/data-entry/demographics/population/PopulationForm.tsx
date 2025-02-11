
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
      region_id: "",
      district_id: "",
      locality: "",
      total_population: 0,
      male_count: 0,
      female_count: 0,
      other_count: 0,
      age_0_4_years: 0,
      age_5_9_years: 0,
    },
  });

  const onSubmit = async (values: PopulationFormValues) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('population_data')
        .insert({
          ...values,
          created_by: user.data.user.id
        });

      if (error) {
        console.error('Submission error:', error);
        throw error;
      }

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
