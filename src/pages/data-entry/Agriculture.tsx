
import React from "react";
import Layout from "@/components/layout/Layout";
import AgricultureForm from "@/components/data-entry/agriculture/AgricultureForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";

const AgricultureEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Agriculture Data Entry</h1>
          <p className="text-gray-600 mt-2">Enter farming and crop data</p>
        </div>

        <div className="grid gap-6">
          <AgricultureForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default AgricultureEntry;
