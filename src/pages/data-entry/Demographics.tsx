import React from "react";
import { Users, Home, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";

const options = [
  {
    title: "Population Distribution",
    description: "Record and manage population statistics by region and demographics",
    icon: Users,
    path: "/data-entry/demographics/population",
  },
  {
    title: "Household Composition",
    description: "Track household sizes, types, and characteristics",
    icon: Home,
    path: "/data-entry/demographics/households",
  },
  {
    title: "Vital Statistics",
    description: "Record births, deaths, marriages, and other vital events",
    icon: FileSpreadsheet,
    path: "/data-entry/demographics/vital-statistics",
  },
  {
    title: "Migration Data",
    description: "Track population movement and migration patterns",
    icon: ArrowRight,
    path: "/data-entry/demographics/migration",
  },
];

const Demographics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Demographics Data Entry</h1>
          <p className="mt-2 text-gray-600">
            Select a category to begin entering demographic data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option) => (
            <Link key={option.path} to={option.path}>
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Demographics;