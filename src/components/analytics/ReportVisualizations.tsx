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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ReportVisualizationsProps {
  populationData: any[];
  householdData: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportVisualizations = ({ 
  populationData, 
  householdData 
}: ReportVisualizationsProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // You'll need to get this from environment variables
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [45.0, 5.0], // Centered on Somalia
      zoom: 5
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Population Distribution Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Population Distribution Over Time</h3>
        <div className="h-[400px]">
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

      {/* Map Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
        <div ref={mapContainer} className="h-[400px] rounded-lg" />
      </Card>

      {/* Household Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Household Distribution by Region</h3>
        <div className="h-[400px]">
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

      {/* Gender Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
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

      {/* Data Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Population Data</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Total Population</TableHead>
                <TableHead>Male</TableHead>
                <TableHead>Female</TableHead>
                <TableHead>Households</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {populationData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.total_population?.toLocaleString()}</TableCell>
                  <TableCell>{item.male_population?.toLocaleString()}</TableCell>
                  <TableCell>{item.female_population?.toLocaleString()}</TableCell>
                  <TableCell>
                    {householdData?.find(h => h.region === item.region)?.household_size?.toLocaleString() || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ReportVisualizations;