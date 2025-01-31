import AdminSite from "@/components/sites/AdminSite";
import ClientSite from "@/components/sites/ClientSite";
import UserSite from "@/components/sites/UserSite";
import "@/styles/globals.css";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export default function App({ Component, pageProps, isAdmin, hasCookie }) {
  
  const [cookieExists, setCookieExists] = useState(hasCookie);

  const [loggedInUser,setLoggedInUser] = useState(undefined)

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    console.log("UserData"+userData)
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedInUser(user);
      setCookieExists(true);

      // Check if user is an admin
      if (user.is_admin === 1) {
        console.log("User is an admin");
      
      } else {
        console.log("User is not an admin");
      
      }
    } else {
      setCookieExists(false);
      setLoggedInUser(null)
     
    }
  }, []);

  return (
    <>


      {loggedInUser ? (
        loggedInUser.is_admin==1 ? (
          <AdminSite setLoggedInUser={setLoggedInUser}  />
        ) : (
          <UserSite loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> // Display UserSite if is_admin cookie is false
        )
      ) : (
        <ClientSite loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/> // Display ClientSite if no cookie is set
      )}
      <main id="main-content">
        <Component loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} {...pageProps} />
      </main>

      <footer>
        <p>&copy; 2024 Conference Website</p>
      </footer>
    </>
  );
}

