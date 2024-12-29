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
import { useCreateStaff } from "@/features/admin/services/staff/queries";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";

const formSchema = z.object({
  email: z.string(),
  role: z.string(),
});

export default function CreateStaffForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createStaff, isLoading: creatingStaffLoader } =
    useCreateStaff();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      role: values.role,
    };
    try {
      await createStaff(data);
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
                <Input {...field} type="text" placeholder="Enter role" />
              </FormControl>
              <FormDescription>
                Enter staff role e.g. Teacher, Admin, Librarian
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader type="submit" isLoading={creatingStaffLoader}>
          Create Staff
        </ButtonLoader>
      </form>
    </Form>
  );
}
