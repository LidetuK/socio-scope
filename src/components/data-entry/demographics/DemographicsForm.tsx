import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  region: z.string().min(1, "Region is required"),
  district: z.string().min(1, "District is required"),
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

const districts = [
  "District 1",
  "District 2",
  "District 3"
];

const DemographicsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
      district: "",
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
    console.log(values);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Population Data Entry Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
                    <SelectContent className="bg-white">
                      {regions.map((region) => (
                        <SelectItem 
                          key={region} 
                          value={region}
                          className="hover:bg-gray-100"
                        >
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
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {districts.map((district) => (
                        <SelectItem 
                          key={district} 
                          value={district}
                          className="hover:bg-gray-100"
                        >
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            {/* Population distribution fields */}
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
  );
};

export default DemographicsForm;