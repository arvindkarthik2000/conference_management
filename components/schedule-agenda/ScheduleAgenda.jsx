import React, { useState } from 'react';
// import './ScheduleAgenda.css';
import Mentor1 from "./images/mentor3.jpg"
import Mentor2 from "./images/mentor1.png"
const schedule = [
  {
    time: '09:00 AM - 10:00 AM',
    title: 'Opening Keynote',
    speaker: 'Dr. Sarah Anderson',
    topic: 'The Future of Technology',
    details: 'An introduction to emerging trends in AI, machine learning, and data science.',
  },
  {
    time: '10:15 AM - 11:30 AM',
    title: 'Panel Discussion: Innovations in AI',
    speaker: 'Various Speakers',
    topic: 'AI Applications and Ethics',
    details: 'A panel discussion on how AI is shaping various industries and ethical concerns.',
  },
  {
    time: '12:00 PM - 01:00 PM',
    title: 'Networking Lunch',
    speaker: '',
    topic: '',
    details: 'Join fellow attendees for networking over lunch.',
  },
  {
    time: '01:30 PM - 03:00 PM',
    title: 'Workshop: Machine Learning 101',
    speaker: 'John Smith',
    topic: 'Introduction to ML',
    details: 'A hands-on workshop covering the basics of machine learning for beginners.',
  },
];

const speakers = [
  { name: 'Dr. Sarah Anderson', bio: 'Expert in AI and technology trends, keynote speaker.', image: Mentor1 },
  { name: 'John Smith', bio: 'Data scientist and machine learning specialist.', image: Mentor2 },
];

const ScheduleAgenda = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  const handleExport = () => {
    // Logic to export the schedule (e.g., as PDF or CSV)
    alert('Schedule exported!');
  };

  return (
    <div className="schedule-agenda-container">
      <h2>Conference Schedule & Agenda</h2>

      {/* Interactive Schedule */}
      <section className="interactive-schedule">
        <h3>Schedule</h3>
        <ul>
          {schedule.map((session, index) => (
            <li key={index}>
              <strong>{session.time}</strong> - {session.title}
              <br />
              <button onClick={() => setSelectedSession(session)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
        
        {/* Session Details Modal */}
        {selectedSession && (
          <div className="session-details">
            <h4>{selectedSession.title}</h4>
            <p><strong>Speaker:</strong> {selectedSession.speaker}</p>
            <p><strong>Topic:</strong> {selectedSession.topic}</p>
            <p>{selectedSession.details}</p>
            <button onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        )}
      </section>

      {/* Speaker Profiles */}
      <section className="speaker-profiles">
        <h3>Speakers</h3>
        <div className="speaker-list">
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-card">
              <img src={speaker.image} alt={speaker.name} />
              <h4>{speaker.name}</h4>
              <p>{speaker.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Export Schedule */}
      <section className="export-schedule">
        <button onClick={handleExport}>Export Schedule</button>
      </section>
    </div>
  );
};

export default ScheduleAgenda;
