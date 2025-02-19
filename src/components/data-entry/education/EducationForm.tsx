
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
  attendance_rate: z.number().min(0).max(100),
  dropout_rate: z.number().min(0).max(100),
  education_level: z.enum(["primary", "secondary", "tertiary"]),
  female_enrollment: z.number().min(0),
  male_enrollment: z.number().min(0),
  district_id: z.string().uuid(),
  region_id: z.string().uuid(),
});

type FormValues = z.infer<typeof formSchema>;

const EducationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance_rate: 0,
      dropout_rate: 0,
      education_level: "primary",
      female_enrollment: 0,
      male_enrollment: 0,
      district_id: "", // This will be populated from a dropdown
      region_id: "", // This will be populated from a dropdown
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user?.id) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('education_enrollment')
        .insert({
          attendance_rate: values.attendance_rate,
          dropout_rate: values.dropout_rate,
          education_level: values.education_level,
          female_enrollment: values.female_enrollment,
          male_enrollment: values.male_enrollment,
          district_id: values.district_id,
          region_id: values.region_id,
          created_by: user.data.user.id
        });

      if (error) throw error;

      toast.success("Education data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving education data:', error);
      toast.error("Failed to save education data");
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

export default EducationForm;
