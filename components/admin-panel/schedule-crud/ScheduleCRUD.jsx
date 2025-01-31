import React, { useState } from 'react';
// import './ScheduleCRUD.css'

const ScheduleCRUD = () => {
  const [schedule, setSchedule] = useState([]);
  const [newSession, setNewSession] = useState({
    title: '',
    time: '',
    speaker: '',
    description: '',
  });

  // Handle input change for the new session
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  // Add a new session to the schedule
  const handleAddSession = () => {
    setSchedule([...schedule, newSession]);
    setNewSession({
      title: '',
      time: '',
      speaker: '',
      description: '',
    });
  };

  // Delete a session
  const handleDeleteSession = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
  };

  // Update a session
  const handleUpdateSession = (index) => {
    const updatedTitle = prompt('Update title', schedule[index].title);
    const updatedTime = prompt('Update time', schedule[index].time);
    const updatedSpeaker = prompt('Update speaker', schedule[index].speaker);
    const updatedDescription = prompt('Update description', schedule[index].description);

    const updatedSchedule = [...schedule];
    updatedSchedule[index] = {
      title: updatedTitle || updatedSchedule[index].title,
      time: updatedTime || updatedSchedule[index].time,
      speaker: updatedSpeaker || updatedSchedule[index].speaker,
      description: updatedDescription || updatedSchedule[index].description,
    };
    setSchedule(updatedSchedule);
  };

  return (
    <div>
      <h2>Manage Schedule</h2>

      <div className="form-group">
        <label>Session Title</label>
        <input
          type="text"
          name="title"
          value={newSession.title}
          onChange={handleInputChange}
          placeholder="Enter session title"
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
        <label>Speaker</label>
        <input
          type="text"
          name="speaker"
          value={newSession.speaker}
          onChange={handleInputChange}
          placeholder="Enter speaker's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={newSession.description}
          onChange={handleInputChange}
          placeholder="Enter session description"
          required
        ></textarea>
      </div>

      <button onClick={handleAddSession}>Add Session</button>

      <h3>Scheduled Sessions</h3>
      <ul>
        {schedule.map((session, index) => (
          <li key={index}>
            <strong>{session.title}</strong> at {session.time}, Speaker: {session.speaker}
            <br />
            <em>{session.description}</em>
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

export default ScheduleCRUD;
