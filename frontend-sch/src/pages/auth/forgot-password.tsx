import { Link } from "react-router-dom";
import { GreeLogo } from "@/assets/images";
import ForgotPasswordForms from "./forms/forgot-password.forms";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <img
              src={GreeLogo}
              alt="Gree Logo"
              className="size-full rounded-full"
            />
          </div>
          Gree Software Solutions
        </Link>
        <ForgotPasswordForms />
      </div>
    </div>
  );
}
