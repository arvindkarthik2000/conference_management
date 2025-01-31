// File: ScheduleCRUD.js

import React, { useState, useEffect } from 'react';

const ScheduleCRUD = () => {
  const [schedule, setSchedule] = useState([]);
  const [editMode,setEditMode]= useState(false); 
  const [newSession, setNewSession] = useState({
    id:'',
    title: '',
    time: '',
    speaker: '',
    description: '',
  });

  // Fetch all sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/schedule');
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Handle input change for the new session
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  // Add a new session
  const handleAddSession = async () => {


    if(editMode){
        try {
            await fetch('/api/schedule', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newSession),
            });
            setNewSession({
                title: '',
                time: '',
                speaker: '',
                description: '',
              });
              setEditMode(false)
            fetchSessions();
          } catch (error) {
            console.error('Error updating session:', error);
          }
    }else{

        try {
            const response = await fetch('/api/schedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newSession),
            });
            const data = await response.json();
            setSchedule([...schedule, data]);
            setNewSession({
              title: '',
              time: '',
              speaker: '',
              description: '',
            });
          } catch (error) {
            console.error('Error adding session:', error);
          }
    }


  };

  // Update a session
  const handleUpdateSession = async (index) => {

    setEditMode(true)
    setNewSession(schedule[index])
  };

  // Delete a session
  const handleDeleteSession = async (index) => {
    try {
      await fetch('/api/schedule', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: schedule[index].id }),
      });
      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
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
          type="datetime-local"
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

      <button onClick={handleAddSession}>{editMode ? 'Update' : 'Add'}  Session</button>

      <h3>Scheduled Sessions</h3>
      <ul>
        {schedule.map((session, index) => (
          <li key={index}>
            <strong>{session.title}</strong> at {new Date(session.time).toLocaleString()}, Speaker: {session.speaker}
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
