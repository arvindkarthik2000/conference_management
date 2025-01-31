import db from "@/lib/db"; // Database connection utility
import bcrypt from "bcryptjs";


export default async function handler(req, res) {
  const { method, query } = req;

  try {
    switch (method) {
      case "GET":
        return await getUsers(res);
      case "POST":
        return await registerUser(req, res);
      case "PUT":
        return await updateUser(req, res, query.id);
      case "DELETE":
        return await deleteUser(res, query.id);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET: Fetch all users
async function getUsers(res) {
  try {
    const [users] = await db.query("SELECT id, email, fullname, is_admin FROM users");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching users" });
  }
}

// POST: Register a new user
async function registerUser(req, res) {
  const { email, fullname, password } = req.body;
  if (!email || !fullname || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users (email, fullname, password, is_admin) VALUES (?, ?, ?, false)`,
      [email, fullname, hashedPassword]
    );
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
}

// PUT: Update an existing user (requires `id` in query)
async function updateUser(req, res, id) {
  const { fullname, is_admin } = req.body;

  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    await db.query(
      `UPDATE users SET fullname = ?, is_admin = ? WHERE id = ?`,
      [fullname, is_admin, id]
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating user" });
  }
}

// DELETE: Delete a user (requires `id` in query)
async function deleteUser(res, id) {
  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting user" });
  }
}
