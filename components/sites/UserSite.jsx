// ClientSite.js
import { useRouter } from 'next/router';
import React, { useState } from "react";
import Link from "next/link";
import { parseCookies, destroyCookie } from 'nookies';
const UserSite = ({ setLoggedInUser }) => {
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

                            <li><Link href="/submission-portal">Submission Portal</Link></li>
                            <li><Link href="/peer-review">Peer Review</Link></li>
                            <li><Link href="/registration-ticketing">Registration & Ticketing</Link></li>
                            <li><Link href="/virtual-conference">Virtual Conference</Link></li>
                            <li><Link href="/mentorship">Mentorship</Link></li>
                            <li><Link href="/chat">Chat</Link></li>
                            <li><a onClick={() => {

console.log(localStorage);


                                localStorage.clear()
                                // alert("Cookie destroyed")
                                console.log(localStorage);
                                setLoggedInUser(null)
                                window.location = "/";


                            }} >Logout</a></li>

                        </ul>
                    </div>
                </nav>
            </header>


        </>
    );
};

export default UserSite;
