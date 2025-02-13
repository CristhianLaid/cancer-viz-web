import { create } from "zustand";
import Cookies from "js-cookie";
import { configEnv } from "@/config/configEnv";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("jwt_token") || null,
  isAuthenticated: localStorage.getItem("jwt_token") ? true : false,
  loading: false,

  setUser: (userData) => {
    Cookies.set("jwt_token", userData.jwt, { expires: 7, path: "" });
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("jwt_token", userData.jwt);
    set({ user: userData.user, token: userData.jwt, isAuthenticated: true });
  },

  setRole: (role) => {
    set((state) => {
      const updatedUser = { ...state.user, role };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  setLoading: (isLoading) => set({ loading: isLoading }),

  logout: () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuthStatus: async () => {
    const token = Cookies.get("jwt_token");

    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, loading: false });
      return;
    }

    set({ loading: true });

    try {
      const res = await fetch(
        `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/auth/check-status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data?.jwt) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.role) {
          data.role = storedUser.role;
        }

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("jwt_token", data.jwt);
        Cookies.set("jwt_token", data.jwt, { expires: 7, path: "" });

        set({ user: data, token: data.jwt, isAuthenticated: true });
      } else {
        set({ user: null, token: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
