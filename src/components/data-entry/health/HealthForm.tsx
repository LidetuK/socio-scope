
import React from "react";
import { Card } from "@/components/ui/card";
import { Syringe, Users, Building2, Microscope, Baby } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Vaccination Coverage",
    description: "Record and manage vaccination data and immunization records",
    icon: Syringe,
    link: "/data-entry/health/vaccination"
  },
  {
    title: "Workforce",
    description: "Track healthcare workers distribution and specializations",
    icon: Users,
    link: "/data-entry/health/workforce"
  },
  {
    title: "Health Infrastructure",
    description: "Monitor healthcare facilities and medical equipment",
    icon: Building2,
    link: "/data-entry/health/infrastructure"
  },
  {
    title: "Epidemiological",
    description: "Track disease surveillance and outbreak monitoring",
    icon: Microscope,
    link: "/data-entry/health/epidemiological"
  },
  {
    title: "Maternal and Child",
    description: "Record maternal health and child healthcare indicators",
    icon: Baby,
    link: "/data-entry/health/maternal-child"
  }
];

const HealthForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1F2C]">Health Data Entry</h1>
        <p className="text-gray-600 mt-2">Select a category to begin entering health data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Card
            key={category.title}
            className="p-6 hover:border-[#9b87f5] cursor-pointer transition-all"
            onClick={() => navigate(category.link)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#9b87f5]/10 rounded-lg">
                <category.icon className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-[#1A1F2C]">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {category.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthForm;
