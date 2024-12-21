interface LoginAdmin {
  email: string;
  password: string;
  name: string;
  role: string;
  gender: string;
  phone: string;
}

type AuthStore = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
};

type LoginUser = Omit<LoginAdmin, "role" | "phone" | "gender" | "name">;
type Errors = {
  response: {
    data: {
      type?: string;
      message?: string;
      error?: string;
    };
  };
};
