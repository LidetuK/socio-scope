import { useQuery } from "@tanstack/react-query";
import { GraduationCap, School, Users, BookOpen } from "lucide-react";
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

const Education = () => {
  const { data: educationData } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Sample trend data (replace with real data later)
  const enrollmentTrends = [
    { year: "2019", students: 100000 },
    { year: "2020", students: 105000 },
    { year: "2021", students: 110000 },
    { year: "2022", students: 115000 },
    { year: "2023", students: 120000 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of educational institutions and student metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Schools"
            value={educationData?.total_schools?.toLocaleString() || "Loading..."}
            icon={<School size={24} />}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard
            title="Total Students"
            value={educationData?.total_students?.toLocaleString() || "Loading..."}
            icon={<Users size={24} />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Total Teachers"
            value={educationData?.total_teachers?.toLocaleString() || "Loading..."}
            icon={<GraduationCap size={24} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Literacy Rate"
            value={`${educationData?.literacy_rate || 0}%`}
            icon={<BookOpen size={24} />}
            trend={{ value: 1.5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Student Enrollment Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Education Statistics">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    category: "Schools",
                    value: educationData?.total_schools || 0,
                  },
                  {
                    category: "Teachers",
                    value: educationData?.total_teachers || 0,
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

export default Education;