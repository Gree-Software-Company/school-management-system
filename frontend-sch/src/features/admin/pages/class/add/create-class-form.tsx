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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchTeachers } from "@/features/admin/services/staff/queries";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useCreateClass } from "@/features/admin/services/class/queries";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  className: z.string(),
  teacher: z.string(),
});

export default function CreateClassForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { data: teacherData, isLoading } = useFetchTeachers();
  const { mutateAsync: createClass, isLoading: creatingClassLoader } =
    useCreateClass();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      name: values?.className,
      teacherId: parseInt(values?.teacher),
    };
    try {
      await createClass(data);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name - (eg: Primary 1)"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter class name here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher">
                      {field.value
                        ? `${
                            teacherData?.find(
                              (t: TeacherStaff) =>
                                t.id.toString() === field.value
                            )?.firstName || ""
                          } ${
                            teacherData?.find(
                              (t: TeacherStaff) =>
                                t.id.toString() === field.value
                            )?.lastName || ""
                          }`
                        : "Select Teacher"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <span className="flex space-x-3">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    teacherData?.map((teacher: TeacherStaff) => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id?.toString()}
                      >
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select teacher to be assigned to the class
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader type="submit" isLoading={creatingClassLoader}>
          Create Class
        </ButtonLoader>
      </form>
    </Form>
  );
}
