import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ChartCard = ({ title, children, className }: ChartCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-up",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="w-full h-[300px]">{children}</div>
    </div>
  );
};

export default ChartCard;