import React, { useState } from 'react';

const WebinarsCRUD = () => {
  const [webinars, setWebinars] = useState([]);
  const [newWebinar, setNewWebinar] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    link: '',
  });

  // Handle input change for new webinar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWebinar({ ...newWebinar, [name]: value });
  };

  // Add a new webinar
  const handleAddWebinar = () => {
    setWebinars([...webinars, newWebinar]);
    setNewWebinar({
      title: '',
      description: '',
      date: '',
      time: '',
      link: '',
    });
  };

  // Delete a webinar
  const handleDeleteWebinar = (index) => {
    const updatedWebinars = webinars.filter((_, i) => i !== index);
    setWebinars(updatedWebinars);
  };

  // Update a webinar
  const handleUpdateWebinar = (index) => {
    const updatedTitle = prompt('Update webinar title', webinars[index].title);
    const updatedDescription = prompt('Update webinar description', webinars[index].description);
    const updatedDate = prompt('Update webinar date', webinars[index].date);
    const updatedTime = prompt('Update webinar time', webinars[index].time);
    const updatedLink = prompt('Update webinar link', webinars[index].link);

    const updatedWebinars = [...webinars];
    updatedWebinars[index] = {
      title: updatedTitle || updatedWebinars[index].title,
      description: updatedDescription || updatedWebinars[index].description,
      date: updatedDate || updatedWebinars[index].date,
      time: updatedTime || updatedWebinars[index].time,
      link: updatedLink || updatedWebinars[index].link,
    };
    setWebinars(updatedWebinars);
  };

  return (
    <div>
      <h2>Manage Webinars</h2>

      <div className="form-group">
        <label>Webinar Title</label>
        <input
          type="text"
          name="title"
          value={newWebinar.title}
          onChange={handleInputChange}
          placeholder="Enter webinar title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={newWebinar.description}
          onChange={handleInputChange}
          placeholder="Enter webinar description"
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={newWebinar.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={newWebinar.time}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Webinar Link</label>
        <input
          type="url"
          name="link"
          value={newWebinar.link}
          onChange={handleInputChange}
          placeholder="Enter webinar link"
          required
        />
      </div>

      <button onClick={handleAddWebinar}>Add Webinar</button>

      <h3>Webinars List</h3>
      <ul>
        {webinars.map((webinar, index) => (
          <li key={index}>
            <strong>Title:</strong> {webinar.title} | <strong>Date:</strong> {webinar.date} | <strong>Time:</strong> {webinar.time}
            <div>
              <button onClick={() => handleUpdateWebinar(index)}>Update</button>
              <button onClick={() => handleDeleteWebinar(index)}>Delete</button>
            </div>
            <p>{webinar.description}</p>
            <a href={webinar.link} target="_blank" rel="noopener noreferrer">Join Webinar</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebinarsCRUD;
