import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Home, 
  HeartPulse, 
  Plane 
} from "lucide-react";

const DemographicsEntry = () => {
  const sections = [
    {
      title: "Population Distribution",
      description: "Enter population statistics and demographic data by region",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      href: "/data-entry/demographics/population"
    },
    {
      title: "Household Composition",
      description: "Record household size, type and head of household details",
      icon: <Home className="w-8 h-8 text-green-500" />,
      href: "/data-entry/demographics/households"
    },
    {
      title: "Vital Statistics",
      description: "Track birth rates, death rates and other vital statistics",
      icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      href: "/data-entry/demographics/vital-statistics"
    },
    {
      title: "Migration Data",
      description: "Monitor internal and international migration patterns",
      icon: <Plane className="w-8 h-8 text-purple-500" />,
      href: "/data-entry/demographics/migration"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Demographics Data Entry</h1>
          <nav className="flex mt-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="hover:text-gray-700">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Data Entry</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span>Demographics</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link 
              key={section.title} 
              to={section.href}
              className="block"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {section.description}
                    </p>
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

export default DemographicsEntry;