import React, { useState } from 'react';
// import './MentorshipSessionCRUD.css'
const MentorshipSessionCRUD = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    mentor: '',
    mentee: '',
    date: '',
    time: '',
    topic: '',
  });

  // Handle input change for new session
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  // Add a new mentorship session
  const handleAddSession = () => {
    setSessions([...sessions, newSession]);
    setNewSession({
      mentor: '',
      mentee: '',
      date: '',
      time: '',
      topic: '',
    });
  };

  // Delete a mentorship session
  const handleDeleteSession = (index) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
  };

  // Update a mentorship session
  const handleUpdateSession = (index) => {
    const updatedMentor = prompt('Update Mentor', sessions[index].mentor);
    const updatedMentee = prompt('Update Mentee', sessions[index].mentee);
    const updatedDate = prompt('Update Date', sessions[index].date);
    const updatedTime = prompt('Update Time', sessions[index].time);
    const updatedTopic = prompt('Update Topic', sessions[index].topic);

    const updatedSessions = [...sessions];
    updatedSessions[index] = {
      mentor: updatedMentor || updatedSessions[index].mentor,
      mentee: updatedMentee || updatedSessions[index].mentee,
      date: updatedDate || updatedSessions[index].date,
      time: updatedTime || updatedSessions[index].time,
      topic: updatedTopic || updatedSessions[index].topic,
    };
    setSessions(updatedSessions);
  };

  return (
    <div>
      <h2>Manage Mentorship Sessions</h2>

      <div className="form-group">
        <label>Mentor</label>
        <input
          type="text"
          name="mentor"
          value={newSession.mentor}
          onChange={handleInputChange}
          placeholder="Enter mentor's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Mentee</label>
        <input
          type="text"
          name="mentee"
          value={newSession.mentee}
          onChange={handleInputChange}
          placeholder="Enter mentee's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={newSession.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={newSession.time}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Topic</label>
        <input
          type="text"
          name="topic"
          value={newSession.topic}
          onChange={handleInputChange}
          placeholder="Enter topic"
          required
        />
      </div>

      <button onClick={handleAddSession}>Add Session</button>

      <h3>Mentorship Sessions List</h3>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            <strong>Mentor:</strong> {session.mentor} | <strong>Mentee:</strong> {session.mentee}
            <div>
              <strong>Date:</strong> {session.date} | <strong>Time:</strong> {session.time}
            </div>
            <div>
              <strong>Topic:</strong> {session.topic}
            </div>
            <div>
              <button onClick={() => handleUpdateSession(index)}>Update</button>
              <button onClick={() => handleDeleteSession(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipSessionCRUD;
