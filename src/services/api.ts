// src/services/api.ts
import { User } from "../types/User";

const BASE = 'https://jsonplaceholder.typicode.com';


// ✅ Fetch all users
export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${BASE}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  } catch (error) {
    console.error("fetchUsers error:", error);
    throw error;
  }
}


// ✅ Create user
export async function createUser(payload:any): Promise<User> {
  try {
    const res = await fetch(`${BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  } catch (error) {
    console.error("createUser error:", error);
    throw error;
  }
}


// ✅ Update user
export async function updateUser(id: number, payload: any): Promise<User> {
  try {
    
    const res = await fetch(`${BASE}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update user");

    return res.json();
  } catch (error) {
    console.error("updateUser error:", error);
    throw error;
  }
}


// ✅ Delete user
export async function deleteUser(id: number): Promise<any> {
  try {
    const res = await fetch(`${BASE}/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    // JSONPlaceholder returns empty object
    return res.json();
  } catch (error) {
    console.error("deleteUser error:", error);
    throw error;
  }
}


// ✅ Fetch user by ID
export async function fetchUserById(id: number): Promise<User> {
  try {
    const res = await fetch(`${BASE}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.error("fetchUserById error:", error);
    throw error;
  }
}
