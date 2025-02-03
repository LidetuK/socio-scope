import React from "react";
import Layout from "@/components/layout/Layout";
import DemographicsForm from "@/components/data-entry/demographics/DemographicsForm";
import BulkUpload from "@/components/data-entry/demographics/BulkUpload";

const DemographicsEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Population Distribution Data Entry</h1>
          <nav className="flex mt-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="hover:text-gray-700">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Demographics</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Population Distribution</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemographicsForm />
          <BulkUpload />
        </div>
      </div>
    </Layout>
  );
};

export default DemographicsEntry;