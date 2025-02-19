
import React from "react";
import Layout from "@/components/layout/Layout";
import LaborForm from "@/components/data-entry/labor/LaborForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";

const LaborEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Labor and Employment Data Entry</h1>
          <p className="text-gray-600 mt-2">Enter workforce and job statistics</p>
        </div>

        <div className="grid gap-6">
          <LaborForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default LaborEntry;
