import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import UserFormFields, { formSchema } from "./UserFormFields";
import { z } from "zod";

interface AddUserFormProps {
  onSuccess: () => void;
}

const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "data_entry",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      console.log("Creating user with values:", values);
      const { error } = await supabase.from("users").insert([{
        full_name: values.full_name,
        email: values.email,
        password: values.password,
        role: values.role,
      }]);
      
      if (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUserMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserFormFields form={form} />
        <Button 
          type="submit" 
          disabled={createUserMutation.isPending}
          className="w-full"
        >
          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  );
};

export default AddUserForm;