interface LoginAdmin {
  email: string;
  password: string;
  name: string;
  role: string;
  gender: string;
  phone: string;
}

type LoginAdminUI = Omit<LoginAdmin, "role" | "phone" | "gender" | "name">;
type Errors = {
  data: {
    type?: string;
    message?: string;
  };
};
