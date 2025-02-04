import React from "react";
import Layout from "@/components/layout/Layout";
import MigrationForm from "@/components/data-entry/migration/MigrationForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";
import Breadcrumb from "@/components/data-entry/demographics/shared/Breadcrumb";

const MigrationEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Migration Data</h1>
          <Breadcrumb currentPage="Migration Data" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MigrationForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default MigrationEntry;