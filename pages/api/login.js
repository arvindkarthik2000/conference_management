import bcrypt from "bcryptjs";
import cookie from "cookie";
import db from "@/lib/db"; // Your database connection file

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Setting user data without password
    const userData = { id: user.id, email: user.email, fullname: user.fullname, is_admin: user.is_admin };

    
      
    

    return res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error"+error });
  }
}
