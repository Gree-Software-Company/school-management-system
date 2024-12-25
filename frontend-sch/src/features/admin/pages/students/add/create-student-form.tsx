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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { useCreateStudent } from "@/features/admin/services/students/queries";
import { useFetchClasses } from "@/features/admin/services/class/queries";
import { Loader2 } from "lucide-react";
import { useFetchSemesters } from "@/features/admin/services/semester/queries";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  classId: z.string(),
  amount: z.string(),
  semesterId: z.string(),
  // dateJoined: z.date(),
});

export default function CreateStudentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: classList, isLoading: loadingClassList } = useFetchClasses();
  const { data: semesterList, isLoading: loadingSemesters } =
    useFetchSemesters();
  const { mutateAsync: createStudent, isLoading: creatingStudentLoader } =
    useCreateStudent();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      classId: parseInt(values.classId.toString()),
      amount: parseFloat(values.amount.toString()),
      semesterId: parseFloat(values.semesterId.toString()),
    };
    try {
      await createStudent(data);
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees (Down Payment)</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter fees" />
              </FormControl>
              <FormDescription>Enter fees</FormDescription>
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
                    <SelectValue placeholder="Select Gender"></SelectValue>
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
          name="semesterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester">
                      {field.value
                        ? `${
                            semesterList?.find(
                              (t: Semester) => t.id === Number(field.value)
                            )?.name || ""
                          }`
                        : "Select Semester"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loadingSemesters ? (
                    <span>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    semesterList?.map((semester: Semester) => (
                      <SelectItem
                        key={semester.id}
                        value={semester.id.toString()}
                      >
                        {semester.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>Select semester/term</FormDescription>
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
                    <SelectValue placeholder="Select Class">
                      {field.value
                        ? `${
                            classList?.find(
                              (t: Class) => t.id === Number(field.value)
                            )?.name || ""
                          }`
                        : "Select Class"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loadingClassList ? (
                    <span>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    classList?.map((classItem: Class) => (
                      <SelectItem
                        key={classItem.id}
                        value={classItem.id.toString()}
                      >
                        {classItem.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>Select student class</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoader type="submit" isLoading={creatingStudentLoader}>
          Create Student
        </ButtonLoader>
      </form>
    </Form>
  );
}
