import { useState, useEffect } from "react";

const UserRegistration = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", fullname: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRegisterUser = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      alert("User registered successfully");
      setNewUser({ email: "", fullname: "", password: "" });
      fetchUsers();
    } else {
      const result = await response.json();
      alert(result.error);
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("User deleted successfully");
      fetchUsers();
    } else {
      alert("Error deleting user");
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <div>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="fullname"
          value={newUser.fullname}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button onClick={handleRegisterUser}>Register</button>
      </div>

   
    </div>
  );
};

export default UserRegistration;
