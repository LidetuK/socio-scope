import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import HouseholdFormFields from "./HouseholdFormFields";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  householdSize: z.number().min(1, "Household size must be at least 1"),
  householdType: z.enum(["single_family", "multi_family"] as const),
  headAge: z.number().min(18, "Head must be at least 18 years old"),
  headGender: z.string().min(1, "Gender is required"),
  headEmploymentStatus: z.string().min(1, "Employment status is required"),
  region_id: z.string().uuid("Please select a region"),
  district_id: z.string().uuid("Please select a district"),
});

type FormValues = z.infer<typeof formSchema>;

const HouseholdForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: 1,
      householdType: "single_family",
      headAge: 18,
      headGender: "",
      headEmploymentStatus: "",
      region_id: "",
      district_id: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to submit data");
        return;
      }

      const dbValues = {
        household_size: values.householdSize,
        household_type: values.householdType,
        head_age: values.headAge,
        head_gender: values.headGender,
        head_employed: values.headEmploymentStatus === "employed",
        head_literacy: true,
        region_id: values.region_id,
        district_id: values.district_id,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('household_data')
        .insert(dbValues);

      if (error) throw error;

      toast.success("Household data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving household data:', error);
      toast.error("Failed to save household data");
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <HouseholdFormFields form={form} />
          
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

export default HouseholdForm;
