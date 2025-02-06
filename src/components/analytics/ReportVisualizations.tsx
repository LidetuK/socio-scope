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
import { supabase } from "@/integrations/supabase/client";

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
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        const { data: { value: mapboxToken }, error } = await supabase
          .functions.invoke('get-mapbox-token');

        if (error) throw error;

        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [45.0, 5.0], // Centered on Somalia
          zoom: 5
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add markers for each region with population data
        populationData?.forEach((region) => {
          // You would need to add actual coordinates for each region
          const coordinates = getRegionCoordinates(region.region);
          if (coordinates) {
            new mapboxgl.Marker()
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `<h3>${region.region}</h3>
                   <p>Population: ${region.total_population?.toLocaleString()}</p>`
                )
              )
              .addTo(map.current!);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, [populationData]);

  // Helper function to get coordinates for regions
  const getRegionCoordinates = (region: string): [number, number] | null => {
    const coordinates: { [key: string]: [number, number] } = {
      'Banadir': [45.3667, 2.0167],
      'Puntland': [49.1833, 8.4000],
      'Somaliland': [44.0667, 9.5667],
      'Galmudug': [47.4333, 6.7667],
      'Hirshabelle': [45.5000, 4.5000],
      'Jubaland': [42.5400, 0.5167],
      'South West State': [44.0950, 2.6185],
      'Middle Shabelle': [45.8667, 3.8333],
      'Lower Juba': [41.5700, -0.2542],
      'Gedo': [42.4800, 3.5000],
      'Bay': [43.6000, 3.1167],
    };
    return coordinates[region] || null;
  };

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