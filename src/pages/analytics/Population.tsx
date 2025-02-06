import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterControls from "@/components/analytics/FilterControls";
import ExportControls from "@/components/analytics/ExportControls";
import ReportVisualizations from "@/components/analytics/ReportVisualizations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AnalyticsPopulation = () => {
  const [region, setRegion] = useState<string>("all");
  const [gender, setGender] = useState<string>("all");
  const [ageGroup, setAgeGroup] = useState<string>("all");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const { data: populationData, isLoading: isLoadingPopulation } = useQuery({
    queryKey: ["population-data", region, gender, ageGroup, timePeriod],
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
    enabled: showReport,
  });

  const { data: householdData, isLoading: isLoadingHouseholds } = useQuery({
    queryKey: ["household-data", region, timePeriod],
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
    enabled: showReport,
  });

  const handleGenerateReport = () => {
    if (!region || !gender || !ageGroup || !timePeriod) {
      toast.error("Please select all filter options");
      return;
    }
    setShowReport(true);
    toast.success("Generating report...");
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

  const isLoading = isLoadingPopulation || isLoadingHouseholds;

  return (
    <Layout>
      <div className="space-y-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Population Analysis Report
            </h1>
            <p className="mt-2 text-gray-600">
              Generate detailed demographic reports and analysis
            </p>
          </div>
          {showReport && (
            <ExportControls 
              data={populationData} 
              onEmailReport={handleEmailReport}
            />
          )}
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

          <Button 
            className="mt-4 bg-primary" 
            onClick={handleGenerateReport}
            disabled={isLoading}
          >
            Generate Report
          </Button>
        </Card>

        {showReport && !isLoading && populationData && householdData && (
          <ReportVisualizations
            populationData={populationData}
            householdData={householdData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AnalyticsPopulation;