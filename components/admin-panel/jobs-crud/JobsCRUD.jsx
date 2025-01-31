import React, { useState } from 'react';
// import './JobsCRUD.css'
const JobsCRUD = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
  });

  // Handle input change for new job
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Add a new job
  const handleAddJob = () => {
    setJobs([...jobs, newJob]);
    setNewJob({
      title: '',
      description: '',
      company: '',
    });
  };

  // Delete a job
  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  // Update a job
  const handleUpdateJob = (index) => {
    const updatedTitle = prompt('Update job title', jobs[index].title);
    const updatedDescription = prompt('Update job description', jobs[index].description);
    const updatedCompany = prompt('Update company name', jobs[index].company);

    const updatedJobs = [...jobs];
    updatedJobs[index] = {
      title: updatedTitle || updatedJobs[index].title,
      description: updatedDescription || updatedJobs[index].description,
      company: updatedCompany || updatedJobs[index].company,
    };
    setJobs(updatedJobs);
  };

  return (
    <div>
      <h2>Manage Job Postings</h2>

      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
          placeholder="Enter job title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={newJob.description}
          onChange={handleInputChange}
          placeholder="Enter job description"
          required
        />
      </div>

      <div className="form-group">
        <label>Company</label>
        <input
          type="text"
          name="company"
          value={newJob.company}
          onChange={handleInputChange}
          placeholder="Enter company name"
          required
        />
      </div>

      <button onClick={handleAddJob}>{editMode ? 'Update' : 'Add'} Job</button>

      <h3>Job Postings List</h3>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>Title:</strong> {job.title} | <strong>Company:</strong> {job.company}
            <div>
              <button onClick={() => handleUpdateJob(index)}>Update</button>
              <button onClick={() => handleDeleteJob(index)}>Delete</button>
            </div>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsCRUD;
