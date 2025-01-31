import React, { useState } from 'react';

const PeerReviewCRUD = () => {
  const [peerReviews, setPeerReviews] = useState([]);
  const [peerReview, setPeerReview] = useState({ id: '', reviewerName: '', paperTitle: '', comments: '' });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPeerReview({ ...peerReview, [name]: value });
  };

  const handleAddPeerReview = () => {
    if (editMode) {
      setPeerReviews(peerReviews.map((review) => (review.id === peerReview.id ? peerReview : review)));
      setEditMode(false);
    } else {
      setPeerReviews([...peerReviews, { ...peerReview, id: Date.now().toString() }]);
    }
    setPeerReview({ id: '', reviewerName: '', paperTitle: '', comments: '' });
  };

  const handleEditPeerReview = (review) => {
    setPeerReview(review);
    setEditMode(true);
  };

  const handleDeletePeerReview = (id) => {
    setPeerReviews(peerReviews.filter((review) => review.id !== id));
  };

  return (
    <div className="peer-review-crud">
      <h2>Manage Peer Reviews</h2>
      
      <div>
        <input
          type="text"
          name="reviewerName"
          placeholder="Reviewer Name"
          value={peerReview.reviewerName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paperTitle"
          placeholder="Paper Title"
          value={peerReview.paperTitle}
          onChange={handleInputChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={peerReview.comments}
          onChange={handleInputChange}
        />
        <button onClick={handleAddPeerReview}>{editMode ? 'Update' : 'Add'} Peer Review</button>
      </div>

      <h3>Peer Review List</h3>
      <ul>
        {peerReviews.map((review) => (
          <li key={review.id}>
            <strong>{review.reviewerName}</strong> - {review.paperTitle}
            <p>{review.comments}</p>
            <button onClick={() => handleEditPeerReview(review)}>Edit</button>
            <button onClick={() => handleDeletePeerReview(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeerReviewCRUD;
