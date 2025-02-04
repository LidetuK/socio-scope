import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import VitalStatsFormFields from "./VitalStatsFormFields";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  birthRate: z.number().min(0, "Birth rate must be a positive number"),
  deathRate: z.number().min(0, "Death rate must be a positive number"),
  infantMortalityRate: z.number().min(0, "Infant mortality rate must be a positive number"),
  maternalMortalityRate: z.number().min(0, "Maternal mortality rate must be a positive number"),
  fertilityRate: z.number().min(0, "Fertility rate must be a positive number"),
  marriageRate: z.number().min(0, "Marriage rate must be a positive number"),
  divorceRate: z.number().min(0, "Divorce rate must be a positive number"),
  region: z.string().min(1, "Region is required"),
});

const VitalStatsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthRate: 0,
      deathRate: 0,
      infantMortalityRate: 0,
      maternalMortalityRate: 0,
      fertilityRate: 0,
      marriageRate: 0,
      divorceRate: 0,
      region: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const dbValues = {
        birth_rate: values.birthRate,
        death_rate: values.deathRate,
        infant_mortality_rate: values.infantMortalityRate,
        maternal_mortality_rate: values.maternalMortalityRate,
        fertility_rate: values.fertilityRate,
        marriage_rate: values.marriageRate,
        divorce_rate: values.divorceRate,
        region: values.region,
        time_period: new Date().toISOString(),
        created_by: (await supabase.auth.getUser()).data.user?.id
      };

      const { error } = await supabase
        .from('vital_statistics')
        .insert(dbValues);

      if (error) throw error;

      toast.success("Vital statistics saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving vital statistics:', error);
      toast.error("Failed to save vital statistics");
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <VitalStatsFormFields form={form} />
          
          <div className="flex justify-end gap-4">
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

export default VitalStatsForm;