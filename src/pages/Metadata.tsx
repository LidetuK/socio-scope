import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MetadataForm } from "@/components/metadata/MetadataForm";
import { MetadataTable } from "@/components/metadata/MetadataTable";
import { DatasetLinks } from "@/components/metadata/DatasetLinks";

const Metadata = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Metadata Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage metadata fields and their associations with datasets
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="new" className="space-y-6">
            <TabsList>
              <TabsTrigger value="new">Define New Metadata Field</TabsTrigger>
              <TabsTrigger value="existing">Update Existing Metadata</TabsTrigger>
              <TabsTrigger value="links">Link Metadata to Datasets</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Create New Metadata Field</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Define a new metadata field with its properties
                </p>
              </div>
              <MetadataForm />
            </TabsContent>

            <TabsContent value="existing" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Existing Metadata Fields</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View and manage existing metadata fields
                </p>
              </div>
              <MetadataTable />
            </TabsContent>

            <TabsContent value="links" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Link Metadata to Datasets</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Associate metadata fields with specific datasets
                </p>
              </div>
              <DatasetLinks />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Metadata;