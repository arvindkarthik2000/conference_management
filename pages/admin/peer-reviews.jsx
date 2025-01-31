import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeerReview = () => {
  const [review, setReview] = useState({
    paperTitle: '-',
    reviewerExpertise: '',
    reviewerName: '',
    feedback: '',
    score: ''
  });
  const [reviews, setReviews] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [editMode,setEditMode]=useState(false)
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get('/api/reviews/');
    
    setReviews(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/reviews', review);
      setSubmissionStatus('Review submitted successfully');
      setEditMode(false)
      fetchReviews();

    } catch (error) {
      setSubmissionStatus('Error submitting review');
    }
  };

  const handleEdit = (existingReview) => {
    setEditMode(true)
    setReview({
      ...existingReview
    });
    
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/reviews?id=${id}`);
    fetchReviews();
  };

  return (
    <div className="peer-review-container">
    

      
      
      
      


            {/* List of Reviews */}
            <h3>All Reviews</h3>
      <ul>
        {reviews.map((rev) => (
          <li key={rev.id}>
            <strong>{rev.paper_title}</strong> by {rev.reviewer_name}
            <p>Feedback: {rev.feedback}</p>
            <p>Score: {rev.score}</p>
            
            <button onClick={() => handleDelete(rev.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PeerReview;
