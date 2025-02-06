import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import ReportVisualizations from "@/components/analytics/ReportVisualizations";

const Population = () => {
  const [showReport, setShowReport] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const { data: populationData, isLoading: isLoadingPopulation } = useQuery({
    queryKey: ["populationData", showReport],
    queryFn: async () => {
      console.log("Fetching population data...");
      const query = supabase
        .from("population_distribution")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching population data:", error);
        toast.error("Error fetching population data");
        return []; // Return empty array instead of throwing
      }

      console.log("Population data fetched:", data);
      return data || [];
    },
    enabled: showReport,
    retry: 1, // Only retry once on failure
  });

  const { data: householdData, isLoading: isLoadingHouseholds } = useQuery({
    queryKey: ["householdData", showReport],
    queryFn: async () => {
      console.log("Fetching household data...");
      const query = supabase
        .from("households")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching household data:", error);
        toast.error("Error fetching household data");
        return []; // Return empty array instead of throwing
      }

      console.log("Household data fetched:", data);
      return data?.map((household) => ({
        region: household.region,
        household_size: household.household_size,
        household_type: household.household_type,
      })) || [];
    },
    enabled: showReport,
    retry: 1, // Only retry once on failure
  });

  const handleGenerateReport = () => {
    console.log("Generating report...");
    setShowReport(true);
    toast.success("Generating report with the latest data...");
  };

  const isLoading = isLoadingPopulation || isLoadingHouseholds;
  const hasData = populationData?.length > 0 || householdData?.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Population Analysis Report
          </h1>
          <p className="mt-2 text-gray-600">
            Generate detailed demographic reports and analysis based on collected data
          </p>
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