import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../services/api";
import Spinner from "./Spinner";
import { User } from "../types/User";
import { toast } from "react-toastify";
import "./UserList.css";
import { Edit2, Eye, EyeIcon, Trash2 } from "lucide-react";
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  let mounted = true;

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      if (mounted) {
        console.log(data)
        setUsers(data);
        setError(null);
      }
    } catch (err: any) {
      if (mounted) setError(err.message || "Failed to load users");
    } finally {
      if (mounted) setLoading(false);
    }
  };

  loadUsers();

  return () => {
    mounted = false; // just assign, no return
  };
}, []);


  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("User Deleted Succesfully!")
    } catch (err: any) {
      toast.error("Delete failed: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container error"> {error}</div>;

  return (
    <div className="container">
      <h2>Users</h2>

      <div className="table">
        <div className="thead">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Actions</div>
        </div>

        {users.map(user => (
          
          <div className="row" key={user.id}>
  <div data-label="Name">{user.name}</div>
  <div data-label="Email">{user.email}</div>
  <div data-label="Phone">{user.phone}</div>
<div className="actions" data-label="Actions">
  <button
    className="icon-btn"
    onClick={() => navigate(`/users/${user.id}`)}
  >
    <EyeIcon size={18} />
  </button>

  <button
    className="icon-btn"
    onClick={() => navigate(`/edit/${user.id}`)}
  >
    <Edit2 size={18} />
  </button>

  <button
    className="icon-btn danger"
    onClick={() => handleDelete(user.id)}
  >
    <Trash2 size={18} />
  </button>
</div>

</div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
