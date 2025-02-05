import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterControls from "@/components/analytics/FilterControls";
import ExportControls from "@/components/analytics/ExportControls";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "sonner";

const AnalyticsPopulation = () => {
  const [region, setRegion] = useState<string>("all");
  const [gender, setGender] = useState<string>("all");
  const [ageGroup, setAgeGroup] = useState<string>("all");
  const [timePeriod, setTimePeriod] = useState<string>("");

  const { data: populationData } = useQuery({
    queryKey: ["population-data", region, gender, ageGroup],
    queryFn: async () => {
      let query = supabase
        .from("population_distribution")
        .select("*")
        .order("created_at", { ascending: false });

      if (region !== "all") {
        query = query.eq("region", region);
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Error fetching population data");
        throw error;
      }

      return data;
    },
  });

  const { data: householdData } = useQuery({
    queryKey: ["household-data", region],
    queryFn: async () => {
      let query = supabase
        .from("households")
        .select("*")
        .order("created_at", { ascending: false });

      if (region !== "all") {
        query = query.eq("region", region);
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Error fetching household data");
        throw error;
      }

      return data;
    },
  });

  const { data: vitalStats } = useQuery({
    queryKey: ["vital-stats", region],
    queryFn: async () => {
      let query = supabase
        .from("vital_statistics")
        .select("*")
        .order("created_at", { ascending: false });

      if (region !== "all") {
        query = query.eq("region", region);
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Error fetching vital statistics");
        throw error;
      }

      return data;
    },
  });

  const handleGenerateReport = () => {
    toast.success("Report generated successfully");
  };

  const handleEmailReport = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          region,
          gender,
          ageGroup,
          timePeriod,
          data: {
            population: populationData,
            households: householdData,
            vitalStats,
          },
        },
      });

      if (error) throw error;
      toast.success("Report sent to email successfully");
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Failed to send report");
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Population Trends Analysis
            </h1>
            <p className="mt-2 text-gray-600">
              Generate and analyze demographic reports
            </p>
          </div>
          <ExportControls 
            data={populationData} 
            onEmailReport={handleEmailReport}
          />
        </div>

        <Card className="p-6">
          <FilterControls
            region={region}
            gender={gender}
            ageGroup={ageGroup}
            timePeriod={timePeriod}
            onRegionChange={setRegion}
            onGenderChange={setGender}
            onAgeGroupChange={setAgeGroup}
            onTimePeriodChange={setTimePeriod}
          />

          <Button className="mt-4 bg-primary" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Population Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_population"
                    stroke="#1850E5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Household Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={householdData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="household_size" fill="#1850E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPopulation;