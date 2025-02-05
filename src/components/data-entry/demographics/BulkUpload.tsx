import React from "react";
import { Card } from "@/components/ui/card";
import FileUpload from "../shared/FileUpload";

const BulkUpload = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Bulk Data Upload</h2>
      <FileUpload />
    </Card>
  );
};

export default BulkUpload;