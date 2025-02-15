
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import Breadcrumb from "@/components/analytics/shared/Breadcrumb";
import ReportVisualizations from "@/components/analytics/ReportVisualizations";
import ExportControls from "@/components/analytics/ExportControls";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AnalyticsDemographics = () => {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const { data: demographicData, isLoading } = useQuery({
    queryKey: ["demographic-reports", filters],
    queryFn: async () => {
      let query = supabase
        .from('demographic_reports')
        .select('*');

      if (filters.region && filters.region !== "all") {
        query = query.eq('region_name', filters.region);
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Failed to fetch demographic data");
        throw error;
      }

      return data || [];
    },
  });

  const handleGenerateReport = () => {
    if (demographicData && demographicData.length > 0) {
      toast.success("Report generated successfully");
    } else {
      toast.error("No data found for the selected filters");
    }
  };

  const handleEmailReport = () => {
    // Implement email functionality
    toast.info("Email feature coming soon");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Demographics Analysis Report</h1>
          <p className="text-gray-600">
            Generate detailed population and demographic reports based on collected data
          </p>
        </div>

        <Breadcrumb currentPage="Demographics Analysis" />

        <FilterControls
          filters={filters}
          setFilters={setFilters}
          onGenerateReport={handleGenerateReport}
        />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : demographicData && demographicData.length > 0 ? (
          <>
            <ExportControls 
              data={demographicData}
              onEmailReport={handleEmailReport}
            />
            <ReportVisualizations 
              populationData={demographicData}
              householdData={demographicData}
            />
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No data available for the selected filters. Please adjust your filters and try again.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AnalyticsDemographics;
