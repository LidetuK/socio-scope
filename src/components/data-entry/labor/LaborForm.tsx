
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  district_id: z.string().uuid(),
  female_participation_rate: z.number().min(0).max(100),
  male_participation_rate: z.number().min(0).max(100),
  region_id: z.string().uuid(),
  sector: z.enum(["formal", "informal"]),
  youth_employment_rate: z.number().min(0).max(100),
  youth_unemployment_rate: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

const LaborForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district_id: "", // This will be populated from a dropdown
      female_participation_rate: 0,
      male_participation_rate: 0,
      region_id: "", // This will be populated from a dropdown
      sector: "formal",
      youth_employment_rate: 0,
      youth_unemployment_rate: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user?.id) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('workforce_statistics')
        .insert({
          district_id: values.district_id,
          female_participation_rate: values.female_participation_rate,
          male_participation_rate: values.male_participation_rate,
          region_id: values.region_id,
          sector: values.sector,
          youth_employment_rate: values.youth_employment_rate,
          youth_unemployment_rate: values.youth_unemployment_rate,
          created_by: user.data.user.id
        });

      if (error) throw error;

      toast.success("Labor data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving labor data:', error);
      toast.error("Failed to save labor data");
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* We'll add form fields here based on your requirements */}
          
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

export default LaborForm;
