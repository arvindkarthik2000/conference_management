import React, { useState, useEffect } from 'react';

const ScheduleSession = () => {
  const [mentors, setMentors] = useState([]);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    scheduled_date: '',
    scheduled_time: '',
  });

  useEffect(() => {
    fetchMentors();
    fetchScheduledSessions();
  }, []);

  const fetchScheduledSessions = async () => {
    const response = await fetch('/api/sessions');
    const data = await response.json();
    // alert(JSON.stringify(data))
    setScheduledSessions(data);
  };

  const handleDeleteSession = async (index) => {
    
    const confirmDelete = window.confirm('Are you sure you want to delete this session?');
    if (!confirmDelete) return;

    const response = await fetch('/api/sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: scheduledSessions[index].id }),
    });
    if (response.ok) {
      alert('Session deleted successfully');
      fetchMentors();  // Refresh data after deletion
      fetchScheduledSessions()
    } else {
      alert('Failed to delete session');
    }
  };

  const fetchMentors = async () => {
    const response = await fetch('/api/mentors');
    const data = await response.json();
    setMentors(data);
    // setScheduledSessions(data.scheduledSessions);
  };

  const handleMentorChange = async (mentorId) => {
    setSelectedMentor(mentorId);
    const mentor = mentors.find((m) => m.id === mentorId);
    setAvailability(mentor ? mentor.availability : []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleScheduleSession = async () => {
    if (!selectedMentor || !userData.scheduled_date || !userData.scheduled_time) {
      alert('Please fill in all fields.');
      return;
    }

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mentor_id: selectedMentor,
        ...userData,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      alert('Session scheduled successfully');
      fetchScheduledSessions()
      setUserData({
        user_name: '',
        user_email: '',
        scheduled_date: '',
        scheduled_time: '',
      });
      fetchMentors();  // Refresh the data after scheduling
    } else {
      alert(result.error || 'Error scheduling session');
    }
  };

  return (
    <div>
      <h2>Schedule a Session</h2>

      <div className="form-group">
        <label>Mentor</label>
        <select onChange={(e) => handleMentorChange(Number(e.target.value))}>
          <option value="">Select a mentor</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name} - {mentor.area_of_expertise}
            </option>
          ))}
        </select>
      </div>

      {availability.length > 0 && (
        <div>
          <h4>Available Slots</h4>
          <div className="form-group">
            <label>Date</label>
            <select
              name="scheduled_date"
              onChange={(e) => handleInputChange(e)}
              value={userData.scheduled_date}
            >
              <option value="">Select a date</option>
              {[...new Set(availability.map((slot) => slot.date))].map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Time</label>
            <select
              name="scheduled_time"
              onChange={(e) => handleInputChange(e)}
              value={userData.scheduled_time}
            >
              <option value="">Select a time</option>
              {availability
                .filter((slot) => slot.date === userData.scheduled_date)
                .map((slot) => (
                  <option key={slot.time} value={slot.time}>
                    {slot.time}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          name="user_name"
          value={userData.user_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Your Email</label>
        <input
          type="email"
          name="user_email"
          value={userData.user_email}
          onChange={handleInputChange}
          required
        />
      </div>

      <button onClick={handleScheduleSession}>Schedule Session</button>

      <h3>Scheduled Sessions</h3>
      <ul>
        {scheduledSessions
          .map((session, index) => (
            

            <>            <li key={index}>
            <strong>Mentor:</strong> {session.mentor_name} | <strong>Area:</strong> {session.area_of_expertise} <br />
            <strong>Scheduled Date:</strong> {new Date(session.scheduled_date).toDateString()} <br />
            <strong>Scheduled Time:</strong> {session.scheduled_time} <br />
            <strong>Attendee:</strong> {session.user_name} ({session.user_email})
            <button onClick={() => handleDeleteSession(index)}>Delete</button>
          </li><br/></>

          ))}
      </ul>
    </div>
  );
};

export default ScheduleSession;
