import { useQuery } from "@tanstack/react-query";
import { LineChart, TrendingUp, ArrowUpDown, DollarSign } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Economy = () => {
  const { data: economyData } = useQuery({
    queryKey: ["trade_economy"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trade_economy")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const gdpTrends = [
    { year: "2019", gdp: 100 },
    { year: "2020", gdp: 105 },
    { year: "2021", gdp: 110 },
    { year: "2022", gdp: 115 },
    { year: "2023", gdp: 120 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Economy Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of economic indicators and trade metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="GDP"
            value={`$${economyData?.gdp?.toLocaleString() || 0}M`}
            icon={<DollarSign size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Inflation Rate"
            value={`${economyData?.inflation_rate || 0}%`}
            icon={<TrendingUp size={24} />}
            trend={{ value: 0.5, isPositive: false }}
          />
          <StatCard
            title="Exports"
            value={`$${economyData?.major_exports?.total || 0}M`}
            icon={<ArrowUpDown size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Imports"
            value={`$${economyData?.major_imports?.total || 0}M`}
            icon={<LineChart size={24} />}
            trend={{ value: 1.8, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="GDP Growth Trend">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={gdpTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gdp"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Trade Balance">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: "Exports",
                    value: economyData?.major_exports?.total || 0,
                  },
                  {
                    category: "Imports",
                    value: economyData?.major_imports?.total || 0,
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

export default Economy;