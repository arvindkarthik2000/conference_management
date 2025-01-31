import React, { useState, useEffect } from 'react';

const JobsCRUD = () => {
  const [jobs, setJobs] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
    application_email: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch('/api/jobs');
    const data = await response.json();
    setJobs(data.jobs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = async () => {

    if(editMode){
        await fetch('/api/jobs', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob),
          });
          fetchJobs();
          setNewJob({ title: '', description: '', company: '', application_email: '' });
          setEditMode(false);
    }else{
        await fetch('/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob),
          });
          setNewJob({ title: '', description: '', company: '', application_email: '' });
          fetchJobs();
    }

  };

  const handleUpdateJob = async (index) => {
    
    setEditMode(true)
    setNewJob(jobs[index])

  };

  const handleDeleteJob = async (id) => {
    await fetch(`/api/jobs?id=${id}`, { method: 'DELETE' });
    fetchJobs();
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

      <div className="form-group">
        <label>Application Email</label>
        <input
          type="email"
          name="application_email"
          value={newJob.application_email}
          onChange={handleInputChange}
          placeholder="Enter application email"
          required
        />
      </div>

      <button onClick={handleAddJob}>Add Job</button>

      <h3>Job Postings List</h3>
      <ul>
        {jobs.map((job,index) => (
          <li key={job.id}>
            <strong>Title:</strong> {job.title} | <strong>Company:</strong> {job.company} | <strong>Email:</strong> {job.application_email}
            <div>
              <button onClick={() => handleUpdateJob(index)}>Update</button>
              <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
            </div>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsCRUD;
