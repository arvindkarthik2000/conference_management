import React from 'react';
import { Link } from 'react-router-dom';
// import './CallForPapers.css';

const CallForPapers = () => {
  return (
    <div className="call-for-papers-container">
      <h2>Call for Papers</h2>

      {/* Submission Guidelines */}
      <section className="submission-guidelines">
        <h3>Submission Guidelines</h3>
        <p>
          We invite researchers and practitioners to submit original papers addressing the latest developments in AI, machine learning, and data science. Papers should adhere to the following guidelines:
        </p>
        <ul>
          <li>Papers must be in PDF format and should not exceed 10 pages.</li>
          <li>The submission should be anonymized for double-blind review.</li>
          <li>Authors are allowed a maximum of 2 submissions.</li>
        </ul>

        <h4>Important Dates</h4>
        <ul>
          <li>Submission Deadline: December 15, 2024</li>
          <li>Notification of Acceptance: January 20, 2025</li>
          <li>Final Paper Submission: February 10, 2025</li>
          <li>Conference Date: March 1-3, 2025</li>
        </ul>
      </section>

      {/* Link to Submissions Portal */}
      <section className="submission-portal-link">
        <h3>Submit Your Paper</h3>
        <Link to="/submission-portal">
          <button className="submit-btn">Go to Submissions Portal</button>
        </Link>
      </section>

      {/* FAQs */}
      <section className="faqs">
        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq">
          <h4>1. What is the format for paper submission?</h4>
          <p>Papers must be submitted in PDF format and should not exceed 10 pages.</p>
        </div>

        <div className="faq">
          <h4>2. Can I submit more than one paper?</h4>
          <p>Yes, each author is allowed to submit up to two papers.</p>
        </div>

        <div className="faq">
          <h4>3. How will I know if my paper is accepted?</h4>
          <p>You will receive a notification of acceptance by January 20, 2025.</p>
        </div>

        <div className="faq">
          <h4>4. Is there a fee for paper submission?</h4>
          <p>No, paper submission is free of charge.</p>
        </div>
      </section>
    </div>
  );
};

export default CallForPapers;
