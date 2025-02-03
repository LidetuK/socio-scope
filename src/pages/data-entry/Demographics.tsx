import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  region: z.string().min(1, "Region is required"),
  district: z.string().min(1, "District is required"),
  locality: z.string().optional(),
  totalPopulation: z.number().min(0, "Population must be a positive number"),
  malePopulation: z.number().min(0, "Male population must be a positive number"),
  femalePopulation: z.number().min(0, "Female population must be a positive number"),
  otherPopulation: z.number().min(0, "Other population must be a positive number"),
  ageGroups: z.object({
    "0-4": z.number().min(0),
    "5-9": z.number().min(0),
    "10-14": z.number().min(0),
    "15-19": z.number().min(0),
  }),
});

const DemographicsEntry = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        "10-14": 0,
        "15-19": 0,
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Implement data submission to Supabase
      console.log(values);
      toast({
        title: "Success",
        description: "Demographic data has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save demographic data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Population Distribution Data Entry</h1>
            <p className="mt-2 text-gray-600">
              Enter demographic information for regions and districts
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              Download Template
            </Button>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Demographic Data Input</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="north">North Region</SelectItem>
                          <SelectItem value="south">South Region</SelectItem>
                          <SelectItem value="east">East Region</SelectItem>
                          <SelectItem value="west">West Region</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="district1">District 1</SelectItem>
                          <SelectItem value="district2">District 2</SelectItem>
                          <SelectItem value="district3">District 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Locality</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter locality name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalPopulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Population</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="malePopulation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Male</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="femalePopulation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Female</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="otherPopulation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">Age Groups</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(form.getValues().ageGroups).map((ageGroup) => (
                      <FormField
                        key={ageGroup}
                        control={form.control}
                        name={`ageGroups.${ageGroup}` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{ageGroup} years</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Reset Form
                  </Button>
                  <Button type="submit">
                    Submit Data
                  </Button>
                </div>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Bulk Data Upload</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
              <div className="mx-auto w-12 h-12 mb-4 text-gray-400">
                <Upload className="w-12 h-12" />
              </div>
              <div className="text-sm text-gray-600">
                <p>Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">CSV, XLS or XLSX (Max size: 10MB)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DemographicsEntry;