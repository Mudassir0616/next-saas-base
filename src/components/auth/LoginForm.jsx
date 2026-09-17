import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (!values.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(values);
    } catch (error) {
      setFormError(error.message || "Unable to sign in");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-head">
        <h1>Welcome back</h1>
        <p>Sign in to your workspace to continue.</p>
      </div>

      <div className="login-hint">
        <Info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          Demo account — <code>admin@example.com</code> / <code>password</code>
        </span>
      </div>

      {formError && (
        <div className="login-alert" role="alert">
          <AlertCircle size={16} />
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@company.com"
            value={values.email}
            onChange={setField("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="field-password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="field-input"
              placeholder="••••••••"
              value={values.password}
              onChange={setField("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="login-row">
          <label className="login-check">
            <input type="checkbox" defaultChecked />
            Remember me
          </label>
          <Link className="login-link" href="/">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting && <span className="spinner" />}
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="login-foot">
        Don&apos;t have an account?{" "}
        <Link className="login-link" href="/">
          Start a free trial
        </Link>
      </p>
    </div>
  );
}
