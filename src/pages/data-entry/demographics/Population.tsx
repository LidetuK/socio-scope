import React from "react";
import Layout from "@/components/layout/Layout";
import PopulationForm from "@/components/data-entry/demographics/population/PopulationForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";
import Breadcrumb from "@/components/data-entry/demographics/shared/Breadcrumb";

const PopulationEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Population Distribution</h1>
          <Breadcrumb currentPage="Population Distribution" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PopulationForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default PopulationEntry;