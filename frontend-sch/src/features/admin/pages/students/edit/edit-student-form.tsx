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
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useEffect } from "react";
import { useUpdateStudent } from "@/features/admin/services/students/queries";
import { useFetchClasses } from "@/features/admin/services/class/queries";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  classId: z.number().optional(),
  gender: z.string().optional(),
});

export default function EditStudentForm({
  data,
}: {
  data: UpdateStudentForm | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      classId: 0,
      gender: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName,
        lastName: data.lastName,
        classId: data.classId,
        gender: data.gender,
      });
    }
  }, [data, form]);
  const { mutateAsync: updateStudent, isLoading: updatingStudentLoader } =
    useUpdateStudent();
  const { data: classData, isLoading: loadingClassData } = useFetchClasses();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data) return;
    const studentData = {
      ...values,
      id: data.id,
    };
    try {
      await updateStudent(studentData);
    } catch (error) {
      console.log("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter first name" {...field} />
              </FormControl>
              <FormDescription>Enter student first name</FormDescription>
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
              <FormDescription>Enter student last name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="capitalize"
                      placeholder={
                        !data?.gender ? "Select Gender" : `${data?.gender}`
                      }
                    ></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select student gender</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !data ? "Select Class" : `${data?.class?.name}`
                      }
                    >
                      {field.value ? `${data?.class?.name}` : "Select Class"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loadingClassData ? (
                    <span className="flex space-x-3">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    classData?.map((data: Class) => (
                      <SelectItem key={data.id} value={data.id?.toString()}>
                        {data.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the class the student belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoader type="submit" isLoading={updatingStudentLoader}>
          Update Student
        </ButtonLoader>
      </form>
    </Form>
  );
}
