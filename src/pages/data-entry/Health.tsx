
import React from "react";
import Layout from "@/components/layout/Layout";

const HealthEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Health Data Entry</h1>
          <p className="text-gray-600 mt-2">Enter healthcare and medical data</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p>Health data entry form will be implemented here</p>
        </div>
      </div>
    </Layout>
  );
};

export default HealthEntry;
