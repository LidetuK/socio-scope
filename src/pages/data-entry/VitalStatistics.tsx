import React from "react";
import Layout from "@/components/layout/Layout";
import VitalStatsForm from "@/components/data-entry/vital-statistics/VitalStatsForm";
import Breadcrumb from "@/components/data-entry/demographics/shared/Breadcrumb";

const VitalStatisticsEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Vital Statistics</h1>
          <Breadcrumb currentPage="Vital Statistics" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <VitalStatsForm />
        </div>
      </div>
    </Layout>
  );
};

export default VitalStatisticsEntry;