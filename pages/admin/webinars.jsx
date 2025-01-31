import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferenceCRUD = () => {
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState({ id: '', name: '', date: '', location: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    const response = await axios.get('/api/webinars');
    setConferences(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConference({ ...conference, [name]: value });
  };

  const handleAddConference = async () => {
    if (editMode) {

      await axios.put(`/api/webinars`, conference, { params: { id: conference.id } });
      setEditMode(false);
    } else {

      const response = await axios.post('/api/webinars', conference);
      setConferences([...conferences, response.data]);
    }
    setConference({ id: '', name: '', date: '', location: '' });
    fetchConferences();
  };

  const handleEditConference = (conf) => {
    setConference(conf)
    setEditMode(true);
  };

  const handleDeleteConference = async (id) => {
    await axios.delete(`/api/webinars?id=${id}`);
    setConferences(conferences.filter((conf) => conf.id !== id));
  };

  return (
    <div className="conference-crud">
      <h2>Manage Webinars</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Webinar Title"
          value={conference.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={conference.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Live Stream Link"
          value={conference.location}
          onChange={handleInputChange}
        />

        <button onClick={handleAddConference}>{editMode ? 'Update' : 'Add'} Webinar</button>
      </div>

      <br />
      <h3>Webinars List</h3>
      <ul>
        {conferences.map((conf) => (
          <li key={conf.id}>
            {conf.name} - {new Date(conf.date).toLocaleString()} - {conf.location}
            <button onClick={() => handleEditConference(conf)}>Edit</button>
            <button onClick={() => handleDeleteConference(conf.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConferenceCRUD;
