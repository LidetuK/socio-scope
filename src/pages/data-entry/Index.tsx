import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Wheat, 
  DollarSign, 
  Building2 
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";

const DataEntryIndex = () => {
  const entities = [
    {
      title: "DEMOGRAPHIC",
      description: "Population and household statistics",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      href: "/data-entry/demographics"
    },
    {
      title: "HEALTH",
      description: "Healthcare and medical data",
      icon: <Heart className="w-8 h-8 text-red-500" />,
      href: "/data-entry/health"
    },
    {
      title: "EDUCATION",
      description: "Schools and student information",
      icon: <GraduationCap className="w-8 h-8 text-green-500" />,
      href: "/data-entry/education"
    },
    {
      title: "LABOR AND EMPLOYMENT",
      description: "Workforce and job statistics",
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      href: "/data-entry/labor"
    },
    {
      title: "AGRICULTURE",
      description: "Farming and crop data",
      icon: <Wheat className="w-8 h-8 text-yellow-500" />,
      href: "/data-entry/agriculture"
    },
    {
      title: "TRADE AND ECONOMY",
      description: "Economic indicators and trade",
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      href: "/data-entry/economy"
    },
    {
      title: "INFRASTRUCTURE",
      description: "Public facilities and services",
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      href: "/data-entry/infrastructure"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Entry</h1>
          <p className="mt-2 text-gray-600">
            Select a category to begin entering data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <Link 
              key={entity.title} 
              to={entity.href}
              className="block"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    {entity.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {entity.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {entity.description}
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

export default DataEntryIndex;