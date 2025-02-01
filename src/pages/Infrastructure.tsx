import { useQuery } from "@tanstack/react-query";
import { Building2, Road, Zap, Droplet } from "lucide-react";
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

const Infrastructure = () => {
  const { data: infrastructureData } = useQuery({
    queryKey: ["infrastructure"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("infrastructure")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const developmentTrends = [
    { year: "2019", development: 70 },
    { year: "2020", development: 75 },
    { year: "2021", development: 80 },
    { year: "2022", development: 85 },
    { year: "2023", development: 90 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Infrastructure Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of infrastructure development and public facilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Roads"
            value={`${infrastructureData?.total_roads_km?.toLocaleString() || 0} km`}
            icon={<Road size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Public Buildings"
            value={infrastructureData?.total_hospitals?.toLocaleString() || "Loading..."}
            icon={<Building2 size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Electricity Coverage"
            value={`${infrastructureData?.electricity_coverage || 0}%`}
            icon={<Zap size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Water Access"
            value={`${infrastructureData?.water_access_rate || 0}%`}
            icon={<Droplet size={24} />}
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Infrastructure Development Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={developmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="development"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Facility Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    facility: "Hospitals",
                    count: infrastructureData?.total_hospitals || 0,
                  },
                  {
                    facility: "Schools",
                    count: infrastructureData?.total_schools || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1850E5" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default Infrastructure;