import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterControlsProps {
  region: string;
  gender: string;
  ageGroup: string;
  timePeriod: string;
  onRegionChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onAgeGroupChange: (value: string) => void;
  onTimePeriodChange: (value: string) => void;
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
  region,
  gender,
  ageGroup,
  timePeriod,
  onRegionChange,
  onGenderChange,
  onAgeGroupChange,
  onTimePeriodChange,
}: FilterControlsProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Region</label>
        <Select value={region} onValueChange={onRegionChange}>
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
        <Select value={gender} onValueChange={onGenderChange}>
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
        <Select value={ageGroup} onValueChange={onAgeGroupChange}>
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
        <Select value={timePeriod} onValueChange={onTimePeriodChange}>
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
  );
};

export default FilterControls;