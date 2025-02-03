import { useEffect, useState } from "react";
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
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">
            Welcome to the SNBS Analytics Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Households"
            value={stats?.households.toLocaleString() || "0"}
            icon={<Home />}
            trend={{ value: 2.5, isPositive: true }}
          />
          <StatCard
            title="Population Records"
            value={stats?.population.toLocaleString() || "0"}
            icon={<Users />}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard
            title="Migration Records"
            value={stats?.migration.toLocaleString() || "0"}
            icon={<FileSpreadsheet />}
            trend={{ value: 0.9, isPositive: true }}
          />
          <StatCard
            title="Vital Statistics"
            value={stats?.vitalStats.toLocaleString() || "0"}
            icon={<ClipboardCheck />}
            trend={{ value: 1.2, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Recent Data Entries">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Chart coming soon...</p>
            </div>
          </ChartCard>
          <ChartCard title="Population Distribution">
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