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
import { useUpdateTeacher } from "@/features/admin/services/staff/queries";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
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
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (staffData) {
      form.reset({
        email: staffData.email,
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        phoneNumber: staffData.phoneNumber || "",
      });
    }
  }, [staffData, form]);
  const { mutateAsync: updateStaff, isLoading: updatingStaffLoader } =
    useUpdateTeacher();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!staffData) return;
    const data = {
      id: staffData?.id,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      //   phoneNumber: values.phoneNumber,
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter first name" {...field} />
              </FormControl>
              <FormDescription>Enter staff first name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter last name" />
              </FormControl>
              <FormDescription>Enter staff last name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter staff phone number</FormDescription>
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
