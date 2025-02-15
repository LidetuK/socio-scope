
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Users, Heart, GraduationCap, Briefcase, LeafyGreen, DollarSign, Building2 } from "lucide-react";

const analyticsCategories = [
  {
    title: "Demographics",
    description: "Population and household statistics analysis",
    icon: Users,
    path: "/analytics/demographics",
    color: "text-blue-500",
  },
  {
    title: "Health",
    description: "Healthcare and medical data analysis",
    icon: Heart,
    path: "/analytics/health",
    color: "text-red-500",
  },
  {
    title: "Education",
    description: "Schools and student information analysis",
    icon: GraduationCap,
    path: "/analytics/education",
    color: "text-green-500",
  },
  {
    title: "Labor & Employment",
    description: "Workforce and job statistics analysis",
    icon: Briefcase,
    path: "/analytics/labor",
    color: "text-purple-500",
  },
  {
    title: "Agriculture",
    description: "Farming and crop data analysis",
    icon: LeafyGreen,
    path: "/analytics/agriculture",
    color: "text-yellow-500",
  },
  {
    title: "Trade & Economy",
    description: "Economic indicators and trade analysis",
    icon: DollarSign,
    path: "/analytics/economy",
    color: "text-emerald-500",
  },
  {
    title: "Infrastructure",
    description: "Public facilities and services analysis",
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
          <p className="text-gray-600 mt-2">Select a category to view analysis reports</p>
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

        {/* Quick Access Links */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                to="/analytics/demographics"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Demographics Report
              </Link>
              <Link 
                to="/analytics/health"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Health Statistics
              </Link>
              <Link 
                to="/analytics/education"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Education Metrics
              </Link>
              <Link 
                to="/analytics/labor"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Employment Data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsIndex;
