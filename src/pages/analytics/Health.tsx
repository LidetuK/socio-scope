
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import Breadcrumb from "@/components/analytics/shared/Breadcrumb";
import { useState } from "react";

const AnalyticsHealth = () => {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const handleGenerateReport = () => {
    console.log("Generating health report with filters:", filters);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumb currentPage="Health Analysis" />

        <h1 className="text-3xl font-bold">Health Analysis Report</h1>
        <p className="text-gray-600">
          Generate detailed healthcare and medical reports based on collected data
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

export default AnalyticsHealth;
