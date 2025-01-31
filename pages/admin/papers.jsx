import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('/api/paper-submit');
      setSubmissions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error loading submissions');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        await axios.delete(`/api/submissions?id=${id}`);
        setSubmissions(submissions.filter((submission) => submission.id !== id));
      } catch (error) {
        setError('Error deleting submission');
      }
    }
  };

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-submissions-container">
      <h2>Submitted Papers</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Subject</th>
              <th>Abstract</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.title}</td>
                <td>{submission.subject}</td>
                <td>{submission.abstract}</td>
                <td>
                  {submission.file_path ? (
                    <a href={submission.file_path} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  ) : (
                    'No file'
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(submission.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubmissions;
