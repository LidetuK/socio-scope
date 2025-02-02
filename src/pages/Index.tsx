import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { Users, Heart, GraduationCap, Briefcase } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  // Fetch data for all sections (admin only)
  const { data: demographicsData, isLoading: isDemographicsLoading } = useQuery({
    queryKey: ['demographics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('demographics')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: healthData, isLoading: isHealthLoading } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: educationData, isLoading: isEducationLoading } = useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: laborData, isLoading: isLaborLoading } = useQuery({
    queryKey: ['labor_employment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('labor_employment')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Sample data for charts
  const trendData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 700 },
    { name: "Jun", value: 900 },
  ];

  if (isDemographicsLoading || isHealthLoading || isEducationLoading || isLaborLoading) {
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

  if (!demographicsData && !healthData && !educationData && !laborData) {
    return (
      <Layout>
        <Alert>
          <AlertDescription>
            No data available. Please add some data to the database to view statistics.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive view of all key indicators across sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Population"
            value={demographicsData?.population?.toLocaleString() || "No data"}
            icon={<Users size={24} />}
            trend={demographicsData ? { value: 2.4, isPositive: true } : undefined}
          />
          <StatCard
            title="Healthcare Access"
            value={healthData ? `${healthData.total_hospitals || 0} Facilities` : "No data"}
            icon={<Heart size={24} />}
            trend={healthData ? { value: 5.1, isPositive: true } : undefined}
          />
          <StatCard
            title="Student Enrollment"
            value={educationData?.total_students?.toLocaleString() || "No data"}
            icon={<GraduationCap size={24} />}
            trend={educationData ? { value: 3.2, isPositive: true } : undefined}
          />
          <StatCard
            title="Employment Rate"
            value={laborData ? `${laborData.employment_rate || 0}%` : "No data"}
            icon={<Briefcase size={24} />}
            trend={laborData ? { value: 1.8, isPositive: true } : undefined}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Population Trends">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1850E5"
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sector Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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

export default Index;