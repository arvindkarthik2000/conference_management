import React, { useState } from 'react';
// import './SpeakersCRUD.css'
const SpeakersCRUD = () => {
  const [speakers, setSpeakers] = useState([]);
  const [newSpeaker, setNewSpeaker] = useState({
    name: '',
    bio: '',
    email: '',
    expertise: '',
  });

  // Handle input change for new speaker
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpeaker({ ...newSpeaker, [name]: value });
  };

  // Add a new speaker
  const handleAddSpeaker = () => {
    setSpeakers([...speakers, newSpeaker]);
    setNewSpeaker({
      name: '',
      bio: '',
      email: '',
      expertise: '',
    });
  };

  // Delete a speaker
  const handleDeleteSpeaker = (index) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
  };

  // Update a speaker
  const handleUpdateSpeaker = (index) => {
    const updatedName = prompt('Update name', speakers[index].name);
    const updatedBio = prompt('Update bio', speakers[index].bio);
    const updatedEmail = prompt('Update email', speakers[index].email);
    const updatedExpertise = prompt('Update expertise', speakers[index].expertise);

    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = {
      name: updatedName || updatedSpeakers[index].name,
      bio: updatedBio || updatedSpeakers[index].bio,
      email: updatedEmail || updatedSpeakers[index].email,
      expertise: updatedExpertise || updatedSpeakers[index].expertise,
    };
    setSpeakers(updatedSpeakers);
  };

  return (
    <div>
      <h2>Manage Speakers</h2>

      <div className="form-group">
        <label>Speaker Name</label>
        <input
          type="text"
          name="name"
          value={newSpeaker.name}
          onChange={handleInputChange}
          placeholder="Enter speaker name"
          required
        />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea
          name="bio"
          value={newSpeaker.bio}
          onChange={handleInputChange}
          placeholder="Enter speaker bio"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newSpeaker.email}
          onChange={handleInputChange}
          placeholder="Enter speaker email"
          required
        />
      </div>

      <div className="form-group">
        <label>Expertise</label>
        <input
          type="text"
          name="expertise"
          value={newSpeaker.expertise}
          onChange={handleInputChange}
          placeholder="Enter speaker expertise"
          required
        />
      </div>

      <button onClick={handleAddSpeaker}>Add Speaker</button>

      <h3>Speaker List</h3>
      <ul>
        {speakers.map((speaker, index) => (
          <li key={index}>
            <strong>{speaker.name}</strong>
            <br />
            <em>{speaker.bio}</em>
            <br />
            Email: {speaker.email}
            <br />
            Expertise: {speaker.expertise}
            <div>
              <button onClick={() => handleUpdateSpeaker(index)}>Update</button>
              <button onClick={() => handleDeleteSpeaker(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeakersCRUD;
