import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import ReportVisualizations from "@/components/analytics/ReportVisualizations";
import ExportControls from "@/components/analytics/ExportControls";

const Population = () => {
  const [showReport, setShowReport] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const { data: populationData, isLoading: isLoadingPopulation } = useQuery({
    queryKey: ["populationData", showReport, filters],
    queryFn: async () => {
      console.log("Fetching population data with filters:", filters);
      let query = supabase
        .from("population_distribution")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.region && filters.region !== "all") {
        query = query.eq("region", filters.region);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching population data:", error);
        toast.error("Error fetching population data");
        return [];
      }

      console.log("Population data fetched:", data);
      return data || [];
    },
    enabled: showReport,
    retry: 1,
  });

  const { data: householdData, isLoading: isLoadingHouseholds } = useQuery({
    queryKey: ["householdData", showReport, filters],
    queryFn: async () => {
      console.log("Fetching household data with filters:", filters);
      let query = supabase
        .from("households")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.region && filters.region !== "all") {
        query = query.eq("region", filters.region);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching household data:", error);
        toast.error("Error fetching household data");
        return [];
      }

      console.log("Household data fetched:", data);
      return data?.map((household) => ({
        region: household.region,
        household_size: household.household_size,
        household_type: household.household_type,
      })) || [];
    },
    enabled: showReport,
    retry: 1,
  });

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", filters);
    setShowReport(true);
    toast.success("Generating report with the latest data...");
  };

  const handleEmailReport = async () => {
    try {
      const { error } = await supabase.functions.invoke("send-report", {
        body: {
          region: filters.region,
          gender: filters.gender,
          ageGroup: filters.ageGroup,
          timePeriod: filters.timePeriod,
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
  const hasData = populationData?.length > 0 || householdData?.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Population Analysis Report
              </h1>
              <p className="mt-2 text-gray-600">
                Generate detailed demographic reports and analysis based on collected data
              </p>
            </div>
            {showReport && hasData && (
              <ExportControls
                data={populationData}
                onEmailReport={handleEmailReport}
              />
            )}
          </div>
        </div>

        <FilterControls
          filters={filters}
          setFilters={setFilters}
          onGenerateReport={handleGenerateReport}
        />

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="ml-2 text-gray-600">Loading report data...</p>
          </div>
        )}

        {!isLoading && showReport && !hasData && (
          <div className="text-center py-8">
            <p className="text-gray-600">No data available for the selected filters.</p>
          </div>
        )}

        {!isLoading && showReport && hasData && (
          <ReportVisualizations
            populationData={populationData || []}
            householdData={householdData || []}
          />
        )}
      </div>
    </Layout>
  );
};

export default Population;