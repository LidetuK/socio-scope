
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Users, Heart, GraduationCap, Briefcase, LeafyGreen, DollarSign, Building2 } from "lucide-react";

const analyticsCategories = [
  {
    title: "DEMOGRAPHIC",
    description: "Population and household statistics",
    icon: Users,
    path: "/analytics/demographics",
    color: "text-blue-500",
  },
  {
    title: "HEALTH",
    description: "Healthcare and medical data",
    icon: Heart,
    path: "/analytics/health",
    color: "text-red-500",
  },
  {
    title: "EDUCATION",
    description: "Schools and student information",
    icon: GraduationCap,
    path: "/analytics/education",
    color: "text-green-500",
  },
  {
    title: "LABOR AND EMPLOYMENT",
    description: "Workforce and job statistics",
    icon: Briefcase,
    path: "/analytics/labor",
    color: "text-purple-500",
  },
  {
    title: "AGRICULTURE",
    description: "Farming and crop data",
    icon: LeafyGreen,
    path: "/analytics/agriculture",
    color: "text-yellow-500",
  },
  {
    title: "TRADE AND ECONOMY",
    description: "Economic indicators and trade",
    icon: DollarSign,
    path: "/analytics/economy",
    color: "text-emerald-500",
  },
  {
    title: "INFRASTRUCTURE",
    description: "Public facilities and services",
    icon: Building2,
    path: "/analytics/infrastructure",
    color: "text-orange-500",
  },
];

const AnalyticsIndex = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 mt-2">Select a category to view analysis and reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsCategories.map((category) => (
            <Link
              key={category.title}
              to={category.path}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${category.color}`}>
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsIndex;
