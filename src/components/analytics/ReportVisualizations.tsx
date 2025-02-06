import { Card } from "@/components/ui/card";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ReportVisualizationsProps {
  populationData: any[];
  householdData: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportVisualizations = ({ 
  populationData, 
  householdData 
}: ReportVisualizationsProps) => {
  // Transform data for gender distribution
  const genderData = [
    { 
      name: 'Male', 
      value: populationData?.[0]?.male_population || 0 
    },
    { 
      name: 'Female', 
      value: populationData?.[0]?.female_population || 0 
    }
  ];

  // Transform data for age distribution
  const ageData = Object.entries(populationData?.[0]?.age_groups || {}).map(([group, count]) => ({
    age_group: group,
    count: count as number,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Population Distribution Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_population"
                name="Total Population"
                stroke="#1850E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Household Distribution by Region</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={householdData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="household_size" 
                name="Household Size"
                fill="#1850E5" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age_group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Population Count"
                fill="#1850E5" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ReportVisualizations;