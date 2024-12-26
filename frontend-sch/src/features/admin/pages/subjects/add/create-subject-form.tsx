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
import { useCreateSubject } from "@/features/admin/services/subjects/queries";
import { Input } from "@/components/ui/input";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";

const formSchema = z.object({
  name: z.string(),
});

export default function CreateSubjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutateAsync: createSubject, isLoading } = useCreateSubject();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createSubject(values);
    } catch (error) {
      console.log("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="name"
                  placeholder="Enter subject name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter subject name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoader type="submit" isLoading={isLoading}>
          Create Subject
        </ButtonLoader>
      </form>
    </Form>
  );
}
