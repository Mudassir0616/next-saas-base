import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { updateProfile } from "@/services/authService";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "jobTitle", label: "Job title", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
];

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [values, setValues] = useState({ name: "", email: "", jobTitle: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name ?? "",
        email: user.email ?? "",
        jobTitle: user.jobTitle ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const setField = (name) => (event) =>
    setValues((current) => ({ ...current, [name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile(values);
      updateUser(values);
      toast.success("Profile updated");
    } catch {
      // ApiClient already surfaces the message.
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your profile and workspace preferences." />

      <div className="grid grid-2-1">
        <Card title="Profile">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {FIELDS.map((field) => (
                <div className="field" key={field.name}>
                  <label className="field-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    className="field-input"
                    value={values[field.name]}
                    onChange={setField(field.name)}
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving && <span className="spinner" />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </form>
        </Card>

        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Card title="Account">
            <div className="cell-stack" style={{ gap: 14 }}>
              <Avatar name={user?.name ?? ""} size={52} />
              <div>
                <div className="cell-primary" style={{ fontSize: 15 }}>
                  {user?.name}
                </div>
                <div className="cell-sub">{user?.role}</div>
              </div>
            </div>
          </Card>

          <Card title="Appearance">
            <p className="page-subtitle" style={{ marginBottom: 14 }}>
              Choose how the workspace looks on this device.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["light", "dark"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`btn ${theme === mode ? "btn-primary" : "btn-secondary"}`}
                  style={{ flex: 1, textTransform: "capitalize" }}
                  onClick={() => setTheme(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

SettingsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
