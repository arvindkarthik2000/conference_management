// ClientSite.js
import React, { useState } from "react";
import Link from "next/link";

const ClientSite = ({ setLoggedInUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="nav-container">
            
            <button className="hamburger" onClick={toggleMenu}>
              ☰
            </button>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/call-for-papers">Call for Papers</Link></li>
              {/* <li><Link href="/submission-portal">Submission Portal</Link></li> */}
              {/* <li><Link href="/peer-review">Peer Review</Link></li> */}
              <li><Link href="/schedule-agenda">Schedule and Agenda</Link></li>
              {/* <li><Link href="/registration-ticketing">Registration & Ticketing</Link></li> */}
              {/* <li><Link href="/virtual-conference">Virtual Conference</Link></li> */}
              <li><Link href="/career-development">Career Development</Link></li>
              {/* <li><Link href="/mentorship">Mentorship</Link></li> */}
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/admin-login">Login</Link></li>
              <li><Link href="/signup">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      </header>


    </>
  );
};

export default ClientSite;
