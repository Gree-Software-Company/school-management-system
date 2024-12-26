import { useUpdateClass } from "@/features/admin/services/class/queries";
import { useFetchTeachers } from "@/features/admin/services/staff/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  className: z.string(),
  teacher: z.string(),
});

export default function EditClassForm({
  classData,
}: {
  classData: {
    id: number;
    name: string;
    teacher: {
      id?: string;
      firstName: string;
      lastName: string;
    };
  };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      teacher: "",
    },
  });

  useEffect(() => {
    if (classData) {
      form.reset({
        className: classData.name,
        teacher: classData.teacher.id,
      });
    }
  }, [classData, form]);

  const { data: teacherData, isLoading: isTeachersLoading } =
    useFetchTeachers();
  const { mutateAsync: updateClass, isLoading: updatingClassLoader } =
    useUpdateClass();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedData = {
        id: classData.id,
        name: values.className,
        teacherId: values.teacher,
      };
      await updateClass(updatedData);
    } catch (error) {
      console.error("Error updating class:", error);
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
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormDescription>Modify class name here</FormDescription>
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
                    <SelectValue
                      placeholder={
                        !classData
                          ? "Select Teacher"
                          : `${classData?.teacher?.firstName} ${classData?.teacher?.lastName}`
                      }
                    >
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
                  {isTeachersLoading ? (
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

        <ButtonLoader type="submit" isLoading={updatingClassLoader}>
          Update Class
        </ButtonLoader>
      </form>
    </Form>
  );
}
