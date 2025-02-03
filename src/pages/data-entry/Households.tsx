import { useState } from "react";
import { useForm } from "react-hook-form";
import { Download, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface HouseholdFormData {
  householdSize: number;
  householdType: string;
  headAge: number;
  headGender: string;
  headLiteracyStatus: string;
  headEmploymentStatus: string;
}

const householdTypes = [
  "Single-family",
  "Multi-family",
  "Extended family",
  "Single person",
  "Other",
];

const genderOptions = ["Male", "Female", "Other"];

const literacyOptions = ["Literate", "Illiterate"];

const employmentOptions = [
  "Employed",
  "Unemployed",
  "Self-employed",
  "Student",
  "Retired",
];

const DataEntryHouseholds = () => {
  const { toast } = useToast();
  const form = useForm<HouseholdFormData>({
    defaultValues: {
      householdSize: 1,
      householdType: "Single-family",
      headAge: 18,
      headGender: "Male",
      headLiteracyStatus: "Literate",
      headEmploymentStatus: "Employed",
    },
  });

  const onSubmit = async (data: HouseholdFormData) => {
    try {
      // TODO: Implement form submission logic
      console.log("Form data:", data);
      toast({
        title: "Success",
        description: "Household data has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save household data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Household Data Entry Form</h1>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
            <Button size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Household Size */}
              <FormField
                control={form.control}
                name="householdSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Household Size</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Household Type */}
              <FormField
                control={form.control}
                name="householdType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Household Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select household type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {householdTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Head of Household Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Head Age */}
                <FormField
                  control={form.control}
                  name="headAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" min={18} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Head Gender */}
                <FormField
                  control={form.control}
                  name="headGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Head Literacy Status */}
                <FormField
                  control={form.control}
                  name="headLiteracyStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Literacy Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select literacy status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {literacyOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Head Employment Status */}
                <FormField
                  control={form.control}
                  name="headEmploymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employmentOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default DataEntryHouseholds;