import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserList from "@/components/users/UserList";
import AddUserForm from "@/components/users/AddUserForm";
import { toast } from "sonner";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage system users, their roles, and permissions
          </p>
        </div>

        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">User List</TabsTrigger>
            <TabsTrigger value="add">Add User</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-6">
            <UserList onEditSuccess={() => {
              toast.success("User updated successfully");
            }} />
          </TabsContent>
          <TabsContent value="add" className="mt-6">
            <AddUserForm onSuccess={() => {
              toast.success("User added successfully");
              setActiveTab("list");
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserManagement;