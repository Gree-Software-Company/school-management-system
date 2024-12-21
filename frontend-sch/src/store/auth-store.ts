import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({
      user,
      isAuthenticated: true,
    });
  },
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  logout: () => {
    localStorage.removeItem("user");
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
