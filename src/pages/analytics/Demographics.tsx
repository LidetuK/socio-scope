
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import { useState } from "react";

const AnalyticsDemographics = () => {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const handleGenerateReport = () => {
    console.log("Generating demographics report with filters:", filters);
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

        <FilterControls
          filters={filters}
          setFilters={setFilters}
          onGenerateReport={handleGenerateReport}
        />
      </div>
    </Layout>
  );
};

export default AnalyticsDemographics;
