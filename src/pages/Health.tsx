
import { useQuery } from "@tanstack/react-query";
import { Heart, Hospital, Stethoscope, Activity } from "lucide-react";
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

const Health = () => {
  const { data: healthData } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_summary")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const healthTrends = [
    { year: "2019", patients: 50000 },
    { year: "2020", patients: 55000 },
    { year: "2021", patients: 58000 },
    { year: "2022", patients: 62000 },
    { year: "2023", patients: 65000 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of healthcare facilities and health indicators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Hospitals"
            value={healthData?.total_hospitals?.toLocaleString() || "Loading..."}
            icon={<Hospital size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Total Clinics"
            value={healthData?.total_clinics?.toLocaleString() || "Loading..."}
            icon={<Heart size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Total Doctors"
            value={healthData?.total_doctors?.toLocaleString() || "Loading..."}
            icon={<Stethoscope size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Life Expectancy"
            value={`${healthData?.life_expectancy || 0} years`}
            icon={<Activity size={24} />}
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Patient Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Healthcare Facilities Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: "Hospitals",
                    value: healthData?.total_hospitals || 0,
                  },
                  {
                    category: "Clinics",
                    value: healthData?.total_clinics || 0,
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

export default Health;
