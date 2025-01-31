// components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css'; // Optional for styling

const AdminLogin = ({setAdminLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Replace with actual login logic
        if (email === 'admin@gmail.com' && password === 'admin') {

            // window.sessionStorage.setItem("adminLoggedIn",true)
            setAdminLoggedIn(true);
            // navigate('/admin-panel'); // Redirect to admin panel on success
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
