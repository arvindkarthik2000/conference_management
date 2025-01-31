import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from 'nookies';
const Login = ({setLoggedInUser}) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    

    const handleRedirect = (p) => {
      router.push(p); // Redirect to '/new-page'
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                // Redirect to the home page after successful login

                if (result.user) {

                    // Assuming result.user is the logged-in user object
                    localStorage.setItem("user", JSON.stringify(result.user));
                    setLoggedInUser(result.user)
                    if(result.user.is_admin){

                        handleRedirect("/admin")

                    }else{
                        
                      handleRedirect("/submission-portal")
                    }
                
                }

            } else {
                setError(result.error || "Login failed");
            }
        } catch (err) {
            console.error("Login request error:", err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;



// // components/LoginPage.js
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { setCookie } from 'nookies';
// // import './AdminLogin.css'; // Optional for styling

// const AdminLogin = ({setAdminLoggedIn}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');


//     const router = useRouter();

//   const handleRedirect = () => {
//     router.push('/admin'); // Redirect to '/new-page'
//   };
//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Replace with actual login logic
//         if (email === 'admin@gmail.com' && password === 'admin') {

//             // window.sessionStorage.setItem("adminLoggedIn",true)
//             setAdminLoggedIn(true);
//             setCookie(null, 'admin', 'true', {
//                 maxAge: 30 * 24 * 60 * 60, // 30 days
//                 path: '/',
//               });
//             handleRedirect()
//             // navigate('/admin-panel'); // Redirect to admin panel on success
//         } else {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>

//                 {error && <p className="error-message">{error}</p>}

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;
