import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeerReview = () => {
  const [review, setReview] = useState({
    paperTitle: '-',
    reviewerExpertise: '',
    feedback: '',
    score: ''
  });
  const [reviews, setReviews] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');

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
      fetchReviews();
    } catch (error) {
      setSubmissionStatus('Error submitting review');
    }
  };

  const handleEdit = (existingReview) => {
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
      {/* Reviewer Assignment Section */}
      <section className="reviewer-assignment">
        <h2>Reviewer Assignment</h2>
        <p>
          Reviewers are assigned based on their expertise in various domains. Please check your assignment to review the paper that aligns with your knowledge.
        </p>
        <div className="assignment-details">
          <strong>Assigned Paper: </strong>
          <span>Understanding AI Ethics in Healthcare</span>
        </div>
        <div className="assignment-details">
          <strong>Reviewer Expertise: </strong>
          <span>Artificial Intelligence, Ethics</span>
        </div>
      </section>

      {/* Review Submission Form */}
      <section className="review-form">
        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="expertise">Name:</label>
            <input
              type="text"
              id="reviewerExpertise"
              name="reviewerExpertise"
              value={review.reviewerExpertise}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={review.feedback}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="score">Score (out of 10):</label>
            <input
              type="number"
              id="score"
              name="score"
              value={review.score}
              onChange={handleChange}
              min="0"
              max="10"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </section>

      {/* Submission Status */}
      {submissionStatus && <p>{submissionStatus}</p>}

    </div>
  );
};

export default PeerReview;
