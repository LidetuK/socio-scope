
import Layout from "@/components/layout/Layout";
import FilterControls from "@/components/analytics/FilterControls";
import Breadcrumb from "@/components/analytics/shared/Breadcrumb";
import { useState } from "react";

const AnalyticsLabor = () => {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageGroup: "",
    timePeriod: "",
  });

  const handleGenerateReport = () => {
    console.log("Generating labor report with filters:", filters);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Labor and Employment Analysis Report</h1>
          <p className="text-gray-600">
            Generate detailed workforce and employment reports based on collected data
          </p>
        </div>

        <Breadcrumb currentPage="Labor Analysis" />

        <FilterControls
          filters={filters}
          setFilters={setFilters}
          onGenerateReport={handleGenerateReport}
        />
      </div>
    </Layout>
  );
};

export default AnalyticsLabor;
