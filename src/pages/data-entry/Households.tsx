import React from "react";
import Layout from "@/components/layout/Layout";
import HouseholdForm from "@/components/data-entry/households/HouseholdForm";
import Breadcrumb from "@/components/data-entry/demographics/shared/Breadcrumb";

const HouseholdsEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Household Composition</h1>
          <Breadcrumb currentPage="Household Composition" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <HouseholdForm />
        </div>
      </div>
    </Layout>
  );
};

export default HouseholdsEntry;