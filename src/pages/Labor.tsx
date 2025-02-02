import { useQuery } from "@tanstack/react-query";
import { Briefcase, TrendingUp, Users, Building } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const Labor = () => {
  const { data: laborData, isLoading } = useQuery({
    queryKey: ["labor"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labor_employment")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const employmentTrends = [
    { year: "2019", employed: 500000 },
    { year: "2020", employed: 520000 },
    { year: "2021", employed: 540000 },
    { year: "2022", employed: 560000 },
    { year: "2023", employed: 580000 },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[140px] rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!laborData) {
    return (
      <Layout>
        <Alert>
          <AlertDescription>
            No labor and employment data available. Please add some data to view statistics.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Labor & Employment Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of workforce statistics and employment indicators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Workforce"
            value={laborData?.total_workforce?.toLocaleString() || "0"}
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
            icon={<Building size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Employment Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={employmentTrends}>
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
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Industry Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  laborData?.industry_distribution
                    ? Object.entries(laborData.industry_distribution).map(
                        ([industry, value]) => ({
                          industry,
                          value,
                        })
                      )
                    : []
                }
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