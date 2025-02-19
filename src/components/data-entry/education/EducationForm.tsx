
import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Building2, BarChart2, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Enrollment and Attendance",
    description: "Track student enrollment, attendance rates and dropout statistics",
    icon: BookOpen,
    link: "/data-entry/education/enrollment"
  },
  {
    title: "Educational Infrastructure",
    description: "Monitor school facilities, classrooms and educational resources",
    icon: Building2,
    link: "/data-entry/education/infrastructure"
  },
  {
    title: "Performance Metrics",
    description: "Record academic performance, test scores and learning outcomes",
    icon: BarChart2,
    link: "/data-entry/education/performance"
  },
  {
    title: "Teacher Metrics Management",
    description: "Track teacher qualifications, distribution and performance",
    icon: Users,
    link: "/data-entry/education/teachers"
  },
  {
    title: "Special Education",
    description: "Monitor special education programs and inclusive learning initiatives",
    icon: Heart,
    link: "/data-entry/education/special"
  }
];

const EducationForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1F2C]">Education Data Entry</h1>
        <p className="text-gray-600 mt-2">Select a category to begin entering education data</p>
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

export default EducationForm;
