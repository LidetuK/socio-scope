
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
  bed_count: z.number().min(0),
  district_id: z.string().uuid(),
  facility_type: z.enum(["hospital", "clinic", "mobile_unit"]),
  has_icu: z.boolean(),
  has_maternity_ward: z.boolean(),
  has_surgery: z.boolean(),
  region_id: z.string().uuid(),
});

type FormValues = z.infer<typeof formSchema>;

const HealthForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bed_count: 0,
      district_id: "", // This will be populated from a dropdown
      facility_type: "clinic",
      has_icu: false,
      has_maternity_ward: false,
      has_surgery: false,
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
        .from('health_facilities')
        .insert({
          bed_count: values.bed_count,
          district_id: values.district_id,
          facility_type: values.facility_type,
          has_icu: values.has_icu,
          has_maternity_ward: values.has_maternity_ward,
          has_surgery: values.has_surgery,
          region_id: values.region_id,
          created_by: user.data.user.id
        });

      if (error) throw error;

      toast.success("Health data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving health data:', error);
      toast.error("Failed to save health data");
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

export default HealthForm;
