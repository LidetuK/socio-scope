
import { useQuery } from "@tanstack/react-query";
import { Users, TrendingUp, Home, UserCheck } from "lucide-react";
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

const Demographics = () => {
  const { data: demographicsData } = useQuery({
    queryKey: ["demographics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("demographics_summary")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const populationTrends = [
    { year: "2019", population: 12000000 },
    { year: "2020", population: 12500000 },
    { year: "2021", population: 13000000 },
    { year: "2022", population: 13500000 },
    { year: "2023", population: 14000000 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demographics Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive overview of population statistics and demographic indicators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Population"
            value={demographicsData?.population?.toLocaleString() || "Loading..."}
            icon={<Users size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Households"
            value={demographicsData?.household_count?.toLocaleString() || "Loading..."}
            icon={<Home size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Literacy Rate"
            value={`${demographicsData?.literacy_rate || 0}%`}
            icon={<UserCheck size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Poverty Rate"
            value={`${demographicsData?.poverty_rate || 0}%`}
            icon={<TrendingUp size={24} />}
            trend={{ value: 1.5, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Population Growth Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={populationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="population"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Gender Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: "Male",
                    value: demographicsData?.male_population || 0,
                  },
                  {
                    category: "Female",
                    value: demographicsData?.female_population || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
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

export default Demographics;
