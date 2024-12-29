import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateStaff } from "@/features/admin/services/staff/queries";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email().optional(),
  role: z.string().optional(),
});

export default function EditStaffForm({
  staffData,
}: {
  staffData: UpdateStaffForm | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    if (staffData) {
      form.reset({
        email: staffData.email,
        role: staffData.role,
      });
    }
  }, [staffData, form]);
  const { mutateAsync: updateStaff, isLoading: updatingStaffLoader } =
    useUpdateStaff();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!staffData) return;
    const data = {
      id: staffData?.id,
      email: values.email,
      role: values.role,
    };
    try {
      await updateStaff(data);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email - example@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter staff email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter role" type="text" {...field} />
              </FormControl>
              <FormDescription>Update/Modify staff role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader type="submit" isLoading={updatingStaffLoader}>
          Update Staff
        </ButtonLoader>
      </form>
    </Form>
  );
}
