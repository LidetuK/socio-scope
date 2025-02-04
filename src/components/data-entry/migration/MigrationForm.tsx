import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import MigrationFormFields from "./MigrationFormFields";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  region: z.string().min(1, "Region is required"),
  ruralToUrban: z.number().min(0, "Must be a positive number"),
  urbanToRural: z.number().min(0, "Must be a positive number"),
  emigration: z.number().min(0, "Must be a positive number"),
  immigration: z.number().min(0, "Must be a positive number"),
  refugeeCount: z.number().min(0, "Must be a positive number"),
  idpCount: z.number().min(0, "Must be a positive number"),
});

const MigrationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
      ruralToUrban: 0,
      urbanToRural: 0,
      emigration: 0,
      immigration: 0,
      refugeeCount: 0,
      idpCount: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('migration_data')
        .insert({
          region: values.region,
          internal_migration_count: values.ruralToUrban + values.urbanToRural,
          international_migration_count: values.emigration + values.immigration,
          displaced_persons_count: values.refugeeCount + values.idpCount,
          created_by: (await supabase.auth.getUser()).data.user?.id,
          time_period: new Date().toISOString()
        });

      if (error) throw error;

      toast.success("Migration data saved successfully");
      form.reset();
    } catch (error) {
      console.error('Error saving migration data:', error);
      toast.error("Failed to save migration data");
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <MigrationFormFields form={form} />
          
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

export default MigrationForm;