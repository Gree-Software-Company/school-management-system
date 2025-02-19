import AdminLayout from "@/layouts/admin.layout";
import RootLayout from "@/layouts/base.layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./protected.routes";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
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
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Admin Layout */}
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
          {/* Settings */}
          <Route
            path="settings"
            lazy={async () => {
              const { default: SettingsLayout } = await import(
                "@/features/admin/pages/settings"
              );
              return { Component: SettingsLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Settings } = await import(
                  "@/features/admin/pages/settings/settings"
                );
                return { Component: Settings };
              }}
            />
            {/* Profile */}
            <Route
              path="account"
              lazy={async () => {
                const { default: Account } = await import(
                  "@/features/admin/pages/settings/account"
                );
                return { Component: Account };
              }}
            />
            <Route
              path="profile"
              lazy={async () => {
                const { default: Profile } = await import(
                  "@/features/admin/pages/settings/profile"
                );
                return { Component: Profile };
              }}
            />
            {/* Canteen */}
            <Route
              path="appearance"
              lazy={async () => {
                const { default: Appearance } = await import(
                  "@/features/admin/pages/settings/appearance"
                );
                return { Component: Appearance };
              }}
            />
          </Route>

          {/* Users */}
          <Route
            path="users"
            lazy={async () => {
              const { default: UsersLayout } = await import(
                "@/features/admin/pages/users/index.tsx"
              );
              return { Component: UsersLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Users } = await import(
                  "@/features/admin/pages/users/users"
                );
                return { Component: Users };
              }}
            />
            <Route
              path="create"
              lazy={async () => {
                const { default: CreateUser } = await import(
                  "@/features/admin/pages/users/add/create-user"
                );
                return { Component: CreateUser };
              }}
            />
            <Route
              path=":id"
              lazy={async () => {
                const { default: ViewUser } = await import(
                  "@/features/admin/pages/users/view/view-user"
                );
                return { Component: ViewUser };
              }}
            />
            <Route
              path=":id/edit"
              lazy={async () => {
                const { default: EditUser } = await import(
                  "@/features/admin/pages/users/edit/edit-user"
                );
                return { Component: EditUser };
              }}
            />
          </Route>
          {/* Staff */}
          <Route
            path="staff"
            lazy={async () => {
              const { default: StaffLayout } = await import(
                "@/features/admin/pages/staff/index.tsx"
              );
              return { Component: StaffLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Staff } = await import(
                  "@/features/admin/pages/staff/staff"
                );
                return { Component: Staff };
              }}
            />
            <Route
              path="create"
              lazy={async () => {
                const { default: CreateStaff } = await import(
                  "@/features/admin/pages/staff/add/create-staff"
                );
                return { Component: CreateStaff };
              }}
            />
            <Route
              path=":id"
              lazy={async () => {
                const { default: ViewStaff } = await import(
                  "@/features/admin/pages/staff/view/view-staff"
                );
                return { Component: ViewStaff };
              }}
            />
            <Route
              path=":id/edit"
              lazy={async () => {
                const { default: EditStaff } = await import(
                  "@/features/admin/pages/staff/edit/edit-staff"
                );
                return { Component: EditStaff };
              }}
            />
          </Route>
          {/* Subjects */}
          <Route
            path="subjects"
            lazy={async () => {
              const { default: SubjectsLayout } = await import(
                "@/features/admin/pages/subjects/index.tsx"
              );
              return { Component: SubjectsLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Subjects } = await import(
                  "@/features/admin/pages/subjects/subjects"
                );
                return { Component: Subjects };
              }}
            />
            <Route
              path="create"
              lazy={async () => {
                const { default: CreateSubject } = await import(
                  "@/features/admin/pages/subjects/add/create-subject"
                );
                return { Component: CreateSubject };
              }}
            />
            <Route
              path=":id"
              lazy={async () => {
                const { default: ViewSubject } = await import(
                  "@/features/admin/pages/subjects/view/view-subject"
                );
                return { Component: ViewSubject };
              }}
            />
            <Route
              path=":id/edit"
              lazy={async () => {
                const { default: EditSubject } = await import(
                  "@/features/admin/pages/subjects/edit/edit-subject"
                );
                return { Component: EditSubject };
              }}
            />
          </Route>
          {/* Students */}
          <Route
            path="students"
            lazy={async () => {
              const { default: StudentsLayout } = await import(
                "@/features/admin/pages/students/index.tsx"
              );
              return { Component: StudentsLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Students } = await import(
                  "@/features/admin/pages/students/students"
                );
                return { Component: Students };
              }}
            />
            <Route
              path="create"
              lazy={async () => {
                const { default: CreateStudent } = await import(
                  "@/features/admin/pages/students/add/create-student"
                );
                return { Component: CreateStudent };
              }}
            />
            <Route
              path=":id"
              lazy={async () => {
                const { default: ViewStudent } = await import(
                  "@/features/admin/pages/students/view/view-student"
                );
                return { Component: ViewStudent };
              }}
            />
            <Route
              path=":id/edit"
              lazy={async () => {
                const { default: EditStudent } = await import(
                  "@/features/admin/pages/students/edit/edit-student"
                );
                return { Component: EditStudent };
              }}
            />
          </Route>
          {/* Class */}
          <Route
            path="class"
            lazy={async () => {
              const { default: ClassLayout } = await import(
                "@/features/admin/pages/class/index.tsx"
              );
              return { Component: ClassLayout };
            }}
          >
            <Route
              index
              lazy={async () => {
                const { default: Class } = await import(
                  "@/features/admin/pages/class/classes"
                );
                return { Component: Class };
              }}
            />
            <Route
              path="create"
              lazy={async () => {
                const { default: CreateClass } = await import(
                  "@/features/admin/pages/class/add/create-class"
                );
                return { Component: CreateClass };
              }}
            />

            <Route
              path=":id"
              lazy={async () => {
                const { default: ViewClass } = await import(
                  "@/features/admin/pages/class/view/view-class"
                );
                return { Component: ViewClass };
              }}
            />
            <Route
              path=":id/edit"
              lazy={async () => {
                const { default: EditClass } = await import(
                  "@/features/admin/pages/class/edit/edit-class"
                );
                return { Component: EditClass };
              }}
            />
          </Route>
          {/* Not Found */}
          <Route
            path="*"
            lazy={async () => {
              const { default: NotFound } = await import(
                "@/features/admin/pages/not-found"
              );
              return { Component: NotFound };
            }}
          />
        </Route>
      </Route>
    </>
  )
);

export default rootRoutes;
