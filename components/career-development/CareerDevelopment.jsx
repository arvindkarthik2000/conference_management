import React from 'react';
// import './CareerDevelopment.css';

const articles = [
  { title: 'How to Advance Your Career', link: '#' },
  { title: '10 Tips for Networking Effectively', link: '#' },
  { title: 'Balancing Work and Continuous Learning', link: '#' },
];

const workshops = [
  { title: 'Career Strategy Workshop', date: 'October 15, 2024', link: '#' },
  { title: 'Personal Branding Webinar', date: 'November 2, 2024', link: '#' },
  { title: 'Mastering Public Speaking', date: 'December 1, 2024', link: '#' },
];

const jobs = [
  { title: 'Assistant Professor of Computer Science', location: 'MIT', link: '#' },
  { title: 'Research Scientist in AI', location: 'Stanford University', link: '#' },
  { title: 'Postdoctoral Researcher in Data Science', location: 'Harvard University', link: '#' },
];

const CareerDevelopment = () => {
  return (
    <div className="career-development-container">
      <h2>Career Development Resources</h2>

      {/* Articles & Guides Section */}
      <section className="articles-guides">
        <h3>Articles & Guides</h3>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.link}>{article.title}</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Workshops & Webinars Section */}
      <section className="workshops-webinars">
        <h3>Workshops & Webinars</h3>
        <ul>
          {workshops.map((workshop, index) => (
            <li key={index}>
              <strong>{workshop.title}</strong> - {workshop.date}
              <br />
              <a href={workshop.link}>Register here</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Job Board Section */}
      <section className="job-board">
        <h3>Job Board</h3>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <strong>{job.title}</strong> - {job.location}
              <br />
              <a href={job.link}>View details</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CareerDevelopment;
