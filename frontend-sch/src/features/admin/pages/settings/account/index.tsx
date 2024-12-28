import { ButtonLoader } from "@/components/shared/loaders/button-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { useUpdateEmail } from "@/features/admin/services/users/queries";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const accountFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountPage() {
  const { user } = useAuthStore();
  const emailForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: updateUserEmail, isLoading: updatingUserEmail } =
    useUpdateEmail();

  async function onEmailSubmit(data: AccountFormValues) {
    try {
      await updateUserEmail(data);
    } catch (error) {
      console.log(error);
    }
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    console.log("Password update:", data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings and change your password.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Change your email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the email associated with your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoader type="submit" isLoading={updatingUserEmail}>
                Update email
              </ButtonLoader>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Change your password. Choose a strong password that you haven't used
            before.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        disabled
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Change password</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
