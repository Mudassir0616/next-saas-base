import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { clearSession, getToken, setSession } from "@/lib/apiClient";
import * as authService from "@/services/authService";

const USER_CACHE_KEY = "auth_user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rehydrate from the cached profile so a refresh doesn't flash the login
    // page. With a real API, swap this for `authService.getCurrentUser()` to
    // re-validate the token on every boot.
    try {
      const cached = window.localStorage.getItem(USER_CACHE_KEY);
      if (getToken() && cached) setUser(JSON.parse(cached));
    } catch {
      clearSession();
    }
    setLoading(false);
  }, []);

  // Authenticates only. Redirecting is the login page's job, so there is exactly
  // one place deciding where a signed-in user lands.
  const login = useCallback(async ({ email, password }) => {
    const { user: profile, access, refresh } = await authService.login({ email, password });

    setSession({ access, refresh });
    window.localStorage.setItem(USER_CACHE_KEY, JSON.stringify(profile));
    setUser(profile);

    return profile;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
      window.localStorage.removeItem(USER_CACHE_KEY);
      setUser(null);
      toast.success("Signed out");
      router.push("/");
    }
  }, [router]);

  const updateUser = useCallback((patch) => {
    setUser((current) => {
      const next = { ...current, ...patch };
      window.localStorage.setItem(USER_CACHE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, logout, updateUser }),
    [user, loading, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
