import { useQuery } from "@tanstack/react-query";
import { Briefcase, Users, TrendingUp, LineChart } from "lucide-react";
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

const Labor = () => {
  const { data: laborData } = useQuery({
    queryKey: ["labor_employment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labor_employment")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const employmentTrends = [
    { year: "2019", employed: 80000 },
    { year: "2020", employed: 82000 },
    { year: "2021", employed: 85000 },
    { year: "2022", employed: 88000 },
    { year: "2023", employed: 90000 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Labor & Employment Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of workforce statistics and employment metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Workforce"
            value={laborData?.total_workforce?.toLocaleString() || "Loading..."}
            icon={<Users size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Employment Rate"
            value={`${laborData?.employment_rate || 0}%`}
            icon={<Briefcase size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Unemployment Rate"
            value={`${laborData?.unemployment_rate || 0}%`}
            icon={<TrendingUp size={24} />}
            trend={{ value: 0.5, isPositive: false }}
          />
          <StatCard
            title="Average Income"
            value={`$${laborData?.average_income?.toLocaleString() || 0}`}
            icon={<LineChart size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Employment Trends">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={employmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="employed"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Industry Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    industry: "Technology",
                    value: 30,
                  },
                  {
                    industry: "Manufacturing",
                    value: 25,
                  },
                  {
                    industry: "Services",
                    value: 35,
                  },
                  {
                    industry: "Agriculture",
                    value: 10,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
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

export default Labor;