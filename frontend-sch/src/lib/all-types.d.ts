interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: string;
  gender: string;
  phone: string;
}

type AuthStore = {
  user: Pick<User, "email" | "id" | "name"> | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, name: string, token: string) => void;
  logout: () => void;
};

type ActiveUser = Pick<User, "email" | "id"> | null;
type LoginUser = Omit<User, "role" | "phone" | "gender" | "name" | "id">;
type Errors = {
  response: {
    data: {
      type?: string;
      message?: string;
      error?: string;
    };
  };
};
