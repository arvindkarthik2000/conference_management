import React, { useState } from 'react';

const ConferenceCRUD = () => {
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState({ id: '', name: '', date: '', location: '' });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConference({ ...conference, [name]: value });
  };

  const handleAddConference = () => {
    if (editMode) {
      setConferences(conferences.map((conf) => (conf.id === conference.id ? conference : conf)));
      setEditMode(false);
    } else {
      setConferences([...conferences, { ...conference, id: Date.now().toString() }]);
    }
    setConference({ id: '', name: '', date: '', location: '' });
  };

  const handleEditConference = (conf) => {
    setConference(conf);
    setEditMode(true);
  };

  const handleDeleteConference = (id) => {
    setConferences(conferences.filter((conf) => conf.id !== id));
  };

  return (
    <div className="conference-crud">
      <h2>Manage Conferences</h2>
      
      <div>
        <input
          type="text"
          name="name"
          placeholder="Conference Name"
          value={conference.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={conference.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={conference.location}
          onChange={handleInputChange}
        />
        <button onClick={handleAddConference}>{editMode ? 'Update' : 'Add'} Conference</button>
      </div>

      <h3>Conference List</h3>
      <ul>
        {conferences.map((conf) => (
          <li key={conf.id}>
            {conf.name} - {conf.date} - {conf.location}
            <button onClick={() => handleEditConference(conf)}>Edit</button>
            <button onClick={() => handleDeleteConference(conf.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConferenceCRUD;
