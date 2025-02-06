import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface FilterControlsProps {
  filters: {
    region: string;
    gender: string;
    ageGroup: string;
    timePeriod: string;
  };
  setFilters: Dispatch<SetStateAction<{
    region: string;
    gender: string;
    ageGroup: string;
    timePeriod: string;
  }>>;
  onGenerateReport: () => void;
}

const regions = [
  "Banadir",
  "Puntland",
  "Somaliland",
  "Galmudug",
  "Hirshabelle",
  "Jubaland",
  "South West State",
  "Middle Shabelle",
  "Lower Juba",
  "Gedo",
  "Bay"
];

const ageGroups = [
  { value: "all", label: "All Ages" },
  { value: "0-4", label: "0-4 years" },
  { value: "5-9", label: "5-9 years" },
  { value: "10-14", label: "10-14 years" },
  { value: "15-19", label: "15-19 years" },
  { value: "20-24", label: "20-24 years" },
  { value: "25-29", label: "25-29 years" },
  { value: "30-34", label: "30-34 years" },
  { value: "35-39", label: "35-39 years" },
  { value: "40-44", label: "40-44 years" },
  { value: "45-49", label: "45-49 years" },
  { value: "50-54", label: "50-54 years" },
  { value: "55-59", label: "55-59 years" },
  { value: "60+", label: "60+ years" }
];

const FilterControls = ({
  filters,
  setFilters,
  onGenerateReport,
}: FilterControlsProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleRegionChange = (value: string) => {
    setFilters(prev => ({ ...prev, region: value }));
  };

  const handleGenderChange = (value: string) => {
    setFilters(prev => ({ ...prev, gender: value }));
  };

  const handleAgeGroupChange = (value: string) => {
    setFilters(prev => ({ ...prev, ageGroup: value }));
  };

  const handleTimePeriodChange = (value: string) => {
    setFilters(prev => ({ ...prev, timePeriod: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select value={filters.region} onValueChange={handleRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <Select value={filters.gender} onValueChange={handleGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Age Group</label>
          <Select value={filters.ageGroup} onValueChange={handleAgeGroupChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Age Group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time Period</label>
          <Select value={filters.timePeriod} onValueChange={handleTimePeriodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onGenerateReport}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default FilterControls;