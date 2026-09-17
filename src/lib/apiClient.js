import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const getToken = () => Cookies.get(TOKEN_KEY);

export const setSession = ({ access, refresh }) => {
  Cookies.set(TOKEN_KEY, access, { sameSite: "lax" });
  if (refresh) Cookies.set(REFRESH_TOKEN_KEY, refresh, { sameSite: "lax" });
};

export const clearSession = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

const messageFromError = (data) => {
  if (!data) return "Something went wrong";
  if (typeof data === "string") return data;
  if (data.detail || data.message || data.error) return data.detail || data.message || data.error;

  // DRF field errors: { email: ["already taken"] }
  const first = Object.values(data)[0];
  if (Array.isArray(first)) return first[0];
  return "Something went wrong";
};

/**
 * Thin axios wrapper. One instance per endpoint group:
 *   export const customers = new ApiClient({ path: "/customers", auth: true });
 */
export default class ApiClient {
  constructor({ path = "", auth = true, timeout = 30000, headers = {} } = {}) {
    this.auth = auth;

    const origin = process.env.NEXT_PUBLIC_BASE_API_URL || "";

    this.instance = axios.create({
      baseURL: `${origin}/api${path}`,
      timeout,
      headers: { "Content-Type": "application/json", ...headers },
    });

    this.instance.interceptors.request.use((config) => {
      if (this.auth) {
        const token = getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      // Let the browser set the multipart boundary itself.
      if (config.data instanceof FormData) delete config.headers["Content-Type"];
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => this.#onError(error)
    );
  }

  #onError(error) {
    if (!error.response) {
      toast.error(error.code === "ECONNABORTED" ? "Request timed out" : "Network error");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message = messageFromError(data);

    if (status === 401 && typeof window !== "undefined") {
      clearSession();
      window.location.href = "/";
      return Promise.reject(error);
    }

    toast.error(message);
    return Promise.reject(error);
  }

  get(url = "", params) {
    return this.instance.get(url, { params });
  }

  post(url = "", data) {
    return this.instance.post(url, data);
  }

  put(url = "", data) {
    return this.instance.put(url, data);
  }

  patch(url = "", data) {
    return this.instance.patch(url, data);
  }

  delete(url = "") {
    return this.instance.delete(url);
  }
}
