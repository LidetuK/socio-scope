
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { Users, Home, FileSpreadsheet, ClipboardCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Use Promise.all for parallel requests
      const [households, population, migration, vitalStats] = await Promise.all([
        supabase.from('households').select('count'),
        supabase.from('population_distribution').select('count'),
        supabase.from('migration_data').select('count'),
        supabase.from('vital_statistics').select('count'),
      ]);

      return {
        households: households.count || 0,
        population: population.count || 0,
        migration: migration.count || 0,
        vitalStats: vitalStats.count || 0,
      };
    },
    // Updated caching configuration for React Query v5
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes (formerly cacheTime)
  });

  return (
    <Layout>
      <div className="space-y-6">
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
            title="Total Households"
            value={isLoading ? "Loading..." : (stats?.households.toLocaleString() || "0")}
            icon={<Home className="text-[#9b87f5]" />}
            trend={{ value: 2.5, isPositive: true }}
            className="hover:border-[#9b87f5]/20 transition-colors"
          />
          <StatCard
            title="Population Records"
            value={isLoading ? "Loading..." : (stats?.population.toLocaleString() || "0")}
            icon={<Users className="text-[#D946EF]" />}
            trend={{ value: 1.8, isPositive: true }}
            className="hover:border-[#D946EF]/20 transition-colors"
          />
          <StatCard
            title="Migration Records"
            value={isLoading ? "Loading..." : (stats?.migration.toLocaleString() || "0")}
            icon={<FileSpreadsheet className="text-[#F97316]" />}
            trend={{ value: 0.9, isPositive: true }}
            className="hover:border-[#F97316]/20 transition-colors"
          />
          <StatCard
            title="Vital Statistics"
            value={isLoading ? "Loading..." : (stats?.vitalStats.toLocaleString() || "0")}
            icon={<ClipboardCheck className="text-[#0EA5E9]" />}
            trend={{ value: 1.2, isPositive: true }}
            className="hover:border-[#0EA5E9]/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Population Trends">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Chart coming soon...</p>
            </div>
          </ChartCard>
          <ChartCard title="Sector Distribution">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Chart coming soon...</p>
            </div>
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
