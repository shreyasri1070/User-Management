import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../services/api";
import Spinner from "./Spinner";
import { User } from "../types/User";
import { toast } from "react-toastify";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // FETCH USER
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        if (!id) {
          setError("Invalid user ID");
          toast.error("Invalid user ID");
          return;
        }

        const data = await fetchUserById(Number(id));

        if (mounted) {
          setUser(data);
          setError(null);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch user";

        if (mounted) {
          setError(message);
          toast.error(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [id]);

  // LOADING STATE
  if (loading) return <Spinner />;

  if (error) return <div className="container"> Error: {error}</div>;

  if (!user) return <div className="container">User not found</div>;

  return (
    <div className="container detail">
      <h2>{user.name}</h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong> {user.phone}
      </p>

      <p>
        <strong>Company:</strong> {user.company?.name ?? "N/A"}
      </p>

      <p>
        <strong>Website:</strong> {user.website}
      </p>

      <button onClick={() => navigate(-1)} className="btn">
        Back
      </button>
    </div>
  );
};

export default UserDetail;
