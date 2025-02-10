
import { useQuery } from "@tanstack/react-query";
import { LineChart as LineChartIcon, TrendingUp, Sprout, Map } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Agriculture = () => {
  const { data: agricultureData } = useQuery({
    queryKey: ["agriculture"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agriculture_summary")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const productionTrends = [
    { year: "2019", production: 1000 },
    { year: "2020", production: 1200 },
    { year: "2021", production: 1400 },
    { year: "2022", production: 1600 },
    { year: "2023", production: 1800 },
  ];

  // Parse crop production data safely
  const cropProductionData = agricultureData?.crop_production 
    ? typeof agricultureData.crop_production === 'string' 
      ? JSON.parse(agricultureData.crop_production)
      : agricultureData.crop_production
    : { totalProduction: 0 };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agriculture Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of agricultural production and farming metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Farmers"
            value={agricultureData?.total_farmers?.toLocaleString() || "Loading..."}
            icon={<Sprout size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Land Under Cultivation"
            value={`${agricultureData?.land_under_cultivation || 0} ha`}
            icon={<Map size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Irrigation Coverage"
            value={`${agricultureData?.irrigation_coverage || 0}%`}
            icon={<TrendingUp size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Crop Production"
            value={`${cropProductionData.totalProduction || 0} tons`}
            icon={<LineChartIcon size={24} />}
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Production Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="production"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Crop Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    crop: "Maize",
                    value: 40,
                  },
                  {
                    crop: "Wheat",
                    value: 30,
                  },
                  {
                    crop: "Rice",
                    value: 20,
                  },
                  {
                    crop: "Others",
                    value: 10,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1850E5" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default Agriculture;
