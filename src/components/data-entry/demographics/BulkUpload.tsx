import React from "react";
import { Card } from "@/components/ui/card";

const BulkUpload = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Bulk Data Upload</h2>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
        <div className="mx-auto flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400 mt-1">CSV or Excel files only</p>
        </div>
      </div>
    </Card>
  );
};

export default BulkUpload;