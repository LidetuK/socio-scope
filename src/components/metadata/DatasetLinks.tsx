import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  metadata_field_id: z.string().min(1, "Metadata field is required"),
  dataset_name: z.string().min(1, "Dataset is required"),
});

const datasets = [
  "demographics",
  "households",
  "education",
  "health",
  "agriculture",
  "infrastructure",
  "labor_employment",
  "trade_economy",
  "migration_data",
  "vital_statistics",
];

export function DatasetLinks() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata_field_id: "",
      dataset_name: "",
    },
  });

  const { data: metadataFields } = useQuery({
    queryKey: ["metadata"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("metadata_fields")
        .select("*")
        .order("field_name");

      if (error) throw error;
      return data;
    },
  });

  const linkMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { error } = await supabase
        .from("metadata_dataset_links")
        .insert([values]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataset-links"] });
      toast({
        title: "Success",
        description: "Dataset linked successfully",
      });
      form.reset();
    },
    onError: (error) => {
      console.error("Error linking dataset:", error);
      toast({
        title: "Error",
        description: "Failed to link dataset",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    linkMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="metadata_field_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metadata Field</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metadata field" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {metadataFields?.map((metadataField) => (
                    <SelectItem key={metadataField.id} value={metadataField.id}>
                      {metadataField.field_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataset_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dataset</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dataset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {datasets.map((dataset) => (
                    <SelectItem key={dataset} value={dataset}>
                      {dataset}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Link Dataset</Button>
      </form>
    </Form>
  );
}