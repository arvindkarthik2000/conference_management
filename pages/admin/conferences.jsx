import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferenceCRUD = () => {
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState({ id: '', name: '', date: '', location: '' ,recorded_link:''});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    const response = await axios.get('/api/conferences');
    setConferences(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConference({ ...conference, [name]: value });
  };

  const handleAddConference = async () => {
    if (editMode) {

      alert(JSON.stringify(conference))
      await axios.put(`/api/conferences`, conference, { params: { id: conference.id } });
      setEditMode(false);
    } else {

      const response = await axios.post('/api/conferences', conference);
      setConferences([...conferences, response.data]);
    }
    setConference({ id: '', name: '', date: '', location: '',recorded_link:'' });
    fetchConferences();
  };

  const handleEditConference = (conf) => {
    setConference(conf)
    setEditMode(true);
  };

  const handleDeleteConference = async (id) => {
    await axios.delete(`/api/conferences?id=${id}`);
    setConferences(conferences.filter((conf) => conf.id !== id));
  };

  return (
    <div className="conference-crud">
      <h2>Manage Virtual Conferences</h2>
      
      <div>
        <input
          type="text"
          name="name"
          placeholder="Conference Name"
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

        <input
          type="text"
          name="recorded_link"
          placeholder="Recorded Session Link"
          value={conference.recorded_link}
          onChange={handleInputChange}
        />
        <button onClick={handleAddConference}>{editMode ? 'Update' : 'Add'} Conference</button>
      </div>

      <br />
      <h3>Conference List</h3>
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
