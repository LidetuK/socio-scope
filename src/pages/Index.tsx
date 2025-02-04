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
    <Layout className="bg-[#F6F7F9]">
      <div className="space-y-8">
        <div className="flex flex-col items-center mb-12">
          <img 
            src="/lovable-uploads/85ddb6a9-a7f3-4b74-a4b3-867d490e6043.png" 
            alt="SNBS Logo" 
            className="w-36 h-36 object-contain mb-6"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1A1F2C]">SNBS ANALYSIS</h1>
            <p className="mt-2 text-[#8E9196] max-w-2xl mx-auto">
              Comprehensive view of all key indicators across sectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Population"
            value={demographicsData?.population?.toLocaleString() || "No data"}
            icon={<Users className="text-[#9b87f5]" size={24} />}
            trend={demographicsData ? { value: 2.4, isPositive: true } : undefined}
            className="hover:border-[#9b87f5]/20 transition-colors"
          />
          <StatCard
            title="Healthcare Access"
            value={healthData ? `${healthData.total_hospitals || 0} Facilities` : "No data"}
            icon={<Heart className="text-[#D946EF]" size={24} />}
            trend={healthData ? { value: 5.1, isPositive: true } : undefined}
            className="hover:border-[#D946EF]/20 transition-colors"
          />
          <StatCard
            title="Student Enrollment"
            value={educationData?.total_students?.toLocaleString() || "No data"}
            icon={<GraduationCap className="text-[#F97316]" size={24} />}
            trend={educationData ? { value: 3.2, isPositive: true } : undefined}
            className="hover:border-[#F97316]/20 transition-colors"
          />
          <StatCard
            title="Employment Rate"
            value={laborData ? `${laborData.employment_rate || 0}%` : "No data"}
            icon={<Briefcase className="text-[#0EA5E9]" size={24} />}
            trend={laborData ? { value: 1.8, isPositive: true } : undefined}
            className="hover:border-[#0EA5E9]/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Population Trends">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DEFF" />
                <XAxis dataKey="name" stroke="#8E9196" />
                <YAxis stroke="#8E9196" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF',
                    border: '1px solid #E5DEFF',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ fill: '#9b87f5', strokeWidth: 2 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sector Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DEFF" />
                <XAxis dataKey="name" stroke="#8E9196" />
                <YAxis stroke="#8E9196" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF',
                    border: '1px solid #E5DEFF',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
