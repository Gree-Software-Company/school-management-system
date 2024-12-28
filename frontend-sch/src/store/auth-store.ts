import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  login: (email, name, token) => {
    const user = {
      email,
      name,
    };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", JSON.stringify(token));
    set({
      user,
      token,
      isAuthenticated: !!token,
    });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
