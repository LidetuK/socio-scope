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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Region/District</label>
        <Select value={region} onValueChange={onRegionChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="north">Northern Region</SelectItem>
            <SelectItem value="south">Southern Region</SelectItem>
            <SelectItem value="east">Eastern Region</SelectItem>
            <SelectItem value="west">Western Region</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Gender</label>
        <Select value={gender} onValueChange={onGenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
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
            <SelectValue placeholder="All Ages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="0-14">0-14</SelectItem>
            <SelectItem value="15-24">15-24</SelectItem>
            <SelectItem value="25-54">25-54</SelectItem>
            <SelectItem value="55+">55+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Time Period</label>
        <Select value={timePeriod} onValueChange={onTimePeriodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterControls;