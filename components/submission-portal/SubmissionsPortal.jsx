import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmissionsPortal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    abstract: '',
    file: null,
    subject: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const response = await axios.get('/api/submissions');
    setSubmissions(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setSubmissionStatus('Please upload a file.');
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      await axios.post('/api/submissions', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmissionStatus('Submission successful!');
      fetchSubmissions();
    } catch (error) {
      setSubmissionStatus('Error submitting data');
    }
  };

  const handleEdit = (submission) => {
    setFormData(submission);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/submissions?id=${id}`);
    fetchSubmissions();
  };

  return (
    <div className="submissions-portal-container">
      <h2>Submit Your Paper</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Paper Title" required />
        <select name="subject" value={formData.subject} onChange={handleChange} required>
          <option value="">Select a subject</option>
          <option value="AI in Healthcare">AI in Healthcare</option>
          <option value="Sustainable Energy">Sustainable Energy</option>
          <option value="Data Science">Data Science</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
        <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" required />
        <input type="file" accept=".pdf" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
      
      <h3>Submissions</h3>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <strong>{submission.title}</strong> by {submission.name}
            <button onClick={() => handleEdit(submission)}>Edit</button>
            <button onClick={() => handleDelete(submission.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionsPortal;
