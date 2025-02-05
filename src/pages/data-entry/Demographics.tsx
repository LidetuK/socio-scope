import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Users, Home } from "lucide-react";
import Breadcrumb from "@/components/data-entry/demographics/shared/Breadcrumb";

const DemographicsEntry = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Demographics Data Entry</h1>
          <Breadcrumb currentPage="Demographics" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/data-entry/demographics/population">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Population Distribution
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter population statistics and demographic data by region
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/data-entry/demographics/households">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <Home className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Household Composition
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Record household size, type and head of household details
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DemographicsEntry;