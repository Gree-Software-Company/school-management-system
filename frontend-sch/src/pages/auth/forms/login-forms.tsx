import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginSchema } from "@/lib/validation-types";
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "@/services/auth/queries";
import { Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate: login, isLoading } = useLogin();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 max-w-3xl mx-auto"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your email here</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>Enter your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Logging in...
                  </span>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link to="/terms-and-conditions">Terms of Service.</Link>{" "}
      </div>
    </div>
  );
}
