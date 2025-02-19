
import React from "react";
import Layout from "@/components/layout/Layout";
import EducationForm from "@/components/data-entry/education/EducationForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";

const EducationEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Education Data Entry</h1>
          <p className="text-gray-600 mt-2">Enter schools and student information</p>
        </div>

        <div className="grid gap-6">
          <EducationForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default EducationEntry;
