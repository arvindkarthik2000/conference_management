import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

import { useState } from "react";


const AdminSite = ({ setLoggedInUser }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/'); // Redirect to '/new-page'
  };

  return (

    <>

      <header >
        <nav className="navbar">
          <div className="nav-container">

            <button className="hamburger" onClick={toggleMenu}>
              ☰
            </button>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>

              <li><Link href="/admin/conferences">Conferences</Link></li>
              <li><Link href="/admin/papers">Papers</Link></li>

              <li><Link href="/admin/peer-reviews">Peer Reviews</Link></li>
              <li><Link href="/admin/schedule">Schedule</Link></li>

              <li><Link href="/admin/ticketing">Ticketing</Link></li>
              <li><Link href="/admin/ticket-sales">Ticket Sales</Link></li>
              <li><Link href="/admin/articles">Articles</Link></li>
              <li><Link href="/admin/jobs">Jobs</Link></li>
              <li><Link href="/admin/webinars">Webinars</Link></li>
              <li><Link href="/admin/mentors">Mentors</Link></li>
              <li><Link href="/admin/mentorship-sessions">Mentorship Sessions</Link></li>
              <li><Link href="/admin/contact-us">Contact Us</Link></li>
              <li><Link href="/admin/users">Users</Link></li>
              <li><Link href="/admin/chat">Chat</Link></li>
              <li><a onClick={() => {
                console.log(localStorage)

                localStorage.clear()
                console.log(localStorage)
                // window.sessionStorage.setItem("adminLoggedIn",false)
                setLoggedInUser(null)

                handleRedirect()

              }}>logout</a></li>
            </ul>
          </div>
        </nav>
      </header>


    </>
  )
}

export default AdminSite;