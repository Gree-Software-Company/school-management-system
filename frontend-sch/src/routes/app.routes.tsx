import AdminLayout from "@/layouts/admin.layout";
import RootLayout from "@/layouts/base.layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      // Root Layout
      <Route path="/" element={<RootLayout />}>
        {/* Login */}
        <Route
          index
          lazy={async () => {
            const { default: Login } = await import("@/pages/auth/login");
            return { Component: Login };
          }}
        />
        {/* Forgot password */}
        <Route
          path="forgot-password"
          lazy={async () => {
            const { default: ForgotPassword } = await import(
              "@/pages/auth/forgot-password.tsx"
            );
            return { Component: ForgotPassword };
          }}
        />
        {/* Verify OTP */}
        <Route
          path="verify-otp"
          lazy={async () => {
            const { default: VerifyOTP } = await import(
              "@/pages/auth/verify-otp.tsx"
            );
            return { Component: VerifyOTP };
          }}
        />
        {/* Reset Password*/}
        <Route
          path="reset-password"
          lazy={async () => {
            const { default: ResetPassword } = await import(
              "@/pages/auth/reset-password.tsx"
            );
            return { Component: ResetPassword };
          }}
        />
        {/* Contact Us */}
        <Route
          path="contact-us"
          lazy={async () => {
            const { default: ContactUs } = await import(
              "@/pages/help/contact-us.tsx"
            );
            return { Component: ContactUs };
          }}
        />
        {/* Terms and Conditions */}
        <Route
          path="terms-and-conditions"
          lazy={async () => {
            const { default: TermsAndConditions } = await import(
              "@/pages/help/terms-and-conditions.tsx"
            );
            return { Component: TermsAndConditions };
          }}
        />
        <Route
          path="*"
          lazy={async () => {
            const { default: NotFound } = await import("@/pages/not-found.tsx");
            return { Component: NotFound };
          }}
        />
      </Route>
      // Admin Layout
      <Route path="/admin" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route
          index
          lazy={async () => {
            const { default: AdminDashboard } = await import(
              "@/features/admin/pages/dashboard/index.tsx"
            );
            return { Component: AdminDashboard };
          }}
        />
        // Staff Layout // Students Layout
      </Route>
    </>
  )
);

export default rootRoutes;
