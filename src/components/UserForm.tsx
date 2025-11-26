import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

import { fetchUserById, createUser, updateUser } from "../services/api";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

interface UserForm {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  mode: "create" | "edit";

}

const CreateEditUser: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
const { id } = useParams<{ id: string }>();
const userId = id ? parseInt(id) : undefined;

  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState<boolean>(mode === "edit");
  const [error, setError] = useState<string | null>(null);

  // LOAD USER IF EDIT MODE
 useEffect(() => {
  let mounted = true;

  const loadUser = async () => {
    if (mode === "edit" && userId) {
      setLoading(true);
      try {
        const data = await fetchUserById(userId);
        if (mounted) {
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        }
      } catch (error: any) {
        if (mounted) {
          setError(error.message || "Failed to load user");
          toast.error(error.message || "Failed to load user");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
  };

  loadUser();
  return () => { mounted = false };
}, [mode, userId]);


  // INPUT HANDLER
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "create") {
        const created = await createUser(form);
        toast.success(
          `User created successfully! (ID: ${created.id ?? "n/a"})`
        );
      } else {
        if (!id) {
          toast.error("Invalid user ID");
          return;
        }
if (mode === "edit" && userId) {
  await updateUser(userId, form);
  toast.success("User updated successfully!");
}

      }

      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      toast.error(message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container form-page">
      <h2>{mode === "create" ? "Create User" : "Edit User"}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn">
            {mode === "create" ? "Create" : "Update"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditUser;
