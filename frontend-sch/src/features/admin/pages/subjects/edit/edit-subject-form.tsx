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
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useEffect } from "react";
import { useUpdateSubject } from "@/features/admin/services/subjects/queries";

const formSchema = z.object({
  name: z.string().optional(),
});

export default function EditSubjectForm({
  subjectData,
}: {
  subjectData: {
    id: string;
    name: string;
  };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (subjectData) {
      form.reset({
        name: subjectData.name,
      });
    }
  }, [subjectData, form]);
  const { mutateAsync: updateSubject, isLoading: updatingSubjectLoader } =
    useUpdateSubject();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!subjectData) return;
    const data = {
      id: subjectData?.id.toString(),
      name: values.name,
    };
    try {
      await updateSubject({
        id: data.id,
        data: {
          id: parseInt(data.id),
          name: data.name,
        },
      });
    } catch (error) {
      console.error("Form submission error", error);
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
                  placeholder="Name - Introduction to Science"
                  type="name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Modify subject name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoader type="submit" isLoading={updatingSubjectLoader}>
          Update Subject
        </ButtonLoader>
      </form>
    </Form>
  );
}
