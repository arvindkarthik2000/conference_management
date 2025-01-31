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
  const [canSubmit, setCanSubmit] = useState(false); // New state to track if all fields are filled

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    // Check if all fields are filled
    const isFormComplete = 
      formData.name && 
      formData.email && 
      formData.title && 
      formData.abstract && 
      formData.file && 
      formData.subject;
    setCanSubmit(isFormComplete);
  }, [formData]); // Update whenever formData changes

  const fetchSubmissions = async () => {
    const response = await axios.get('/api/paper-submit');
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
      const response = await axios.post('/api/paper-submit', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.message) {
        
        setSubmissionStatus('Submission successful!');

        try {
          const res = await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recipient: formData.email,
                subject: "Your Submission Has Been Received!",
                message: `
            Hello,
            Thank you for submitting your research paper to the 2025 AI Conference. Your submission, along with the accompanying PDF file, has been successfully received.
            
            What’s next?
            - Our expert reviewers will carefully evaluate your submission.
            - Stay updated on conference schedules, announcements, and opportunities.
            
            We are thrilled to have you contribute to the exciting discussions around AI, machine learning, and data science.
                        
            Best regards,  
            The 2025 AI Conference Team
            `.trim(), // Ensures no unnecessary spaces or tabs
            }),
                      });
          
          const data = await res.json();
          if (data.message === 'Email sent successfully!') {
              alert('Email sent successfully!');
          } else {
              alert('Failed to send email.');
          }
      } catch (error) {
          alert('Error sending email');
      }
      setFormData({
        name: '',
        email: '',
        title: '',
        abstract: '',
        file: null,
        subject: ''
      });



      }
    } catch (error) {
      setSubmissionStatus('Error submitting data: ' + error.message);
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
        <button type="submit" disabled={!canSubmit}>Submit</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default SubmissionsPortal;
