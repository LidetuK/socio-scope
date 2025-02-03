import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  totalPopulation: z.number().min(0, "Population must be a positive number"),
  malePopulation: z.number().min(0, "Male population must be a positive number"),
  femalePopulation: z.number().min(0, "Female population must be a positive number"),
  otherPopulation: z.number().min(0, "Other population must be a positive number"),
  ageGroups: z.object({
    "0-4": z.number().min(0),
    "5-9": z.number().min(0),
  }),
});

const regions = [
  "Banadir",
  "Puntland",
  "Somaliland",
  "Galmudug",
  "Hirshabelle",
  "Jubaland",
  "South West State",
  "Middle Shabelle",
  "Lower Juba",
  "Gedo",
  "Bay"
];

const DemographicsEntry = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Population Distribution Data Entry</h1>
          <nav className="flex mt-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="hover:text-gray-700">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Demographics</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Population Distribution</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Population Data Entry Form</h2>
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
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
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

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Bulk Data Upload</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
              <div className="mx-auto flex flex-col items-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">CSV or Excel files only</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DemographicsEntry;