
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import { useState } from "react";

const AnalyticsEducation = () => {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const handleGenerateReport = () => {
    console.log("Generating education report with filters:", filters);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Education Analysis Report</h1>
        <p className="text-gray-600">
          Generate detailed education and school reports based on collected data
        </p>

        <FilterControls
          filters={filters}
          setFilters={setFilters}
          onGenerateReport={handleGenerateReport}
        />
      </div>
    </Layout>
  );
};

export default AnalyticsEducation;
