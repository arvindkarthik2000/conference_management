import React from 'react';
import { Link } from 'react-router-dom';
// import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      
      {/* Jumbotron with Black Tint */}
      <section className="jumbotron">
        <div className="overlay">
          <h1>Welcome to the 2025 AI Conference</h1>
          <p>
            Join us for cutting-edge discussions and innovations in AI, machine learning, and data science. Be part of the future of technology!
          </p>
        </div>
      </section>

      {/* Quick Links to Key Pages */}
      <section className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-container">
          <Link to="/call-for-papers">
            <button className="quick-link-btn">Call for Papers</button>
          </Link>
          <Link to="/registration-ticketing">
            <button className="quick-link-btn">Registration</button>
          </Link>
          <Link to="/schedule-agenda">
            <button className="quick-link-btn">Conference Schedule</button>
          </Link>

        
        </div>
      </section>

      {/* Latest News and Announcements */}
      <section className="news-section">
        <h2>Latest News & Announcements</h2>
        <div className="news-item">
          <h4>Keynote Speaker Announcement</h4>
          <p>Dr. Jane Doe, a pioneer in AI ethics, will be our keynote speaker!</p>
        </div>
        <div className="news-item">
          <h4>Extended Submission Deadline</h4>
          <p>The deadline for paper submissions has been extended to December 20, 2024.</p>
        </div>
        <div className="news-item">
          <h4>Early Bird Registration Open</h4>
          <p>Take advantage of our early bird discount and register before January 10, 2025.</p>
        </div>

      </section>
    </div>
  );
};

export default HomePage;

// import Jumbotron from "./images/jumbotron.png"

// const Home = () => {
//   return (
//     <div className="jumbotron">
//       <img src={Jumbotron} alt="Conference" className="jumbotron-img" />
//       <h1>Welcome to the Virtual Conference</h1>
//       <p>Join us for an amazing event focused on career development, mentorship, and peer review.</p>
//     </div>
//   );
// };

// export default Home;
