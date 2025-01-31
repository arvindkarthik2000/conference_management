import React, { useState, useEffect } from "react";
import axios from "axios";

const PeerReview = () => {
  const [review, setReview] = useState({
    submissionId: null,
    paperTitle: "", // Auto-filled from the dropdown's first option
    reviewerName: "",
    reviewerExpertise: "",
    feedback: "",
    score: "",
    filePath: "",
  });
  const [availablePapers, setAvailablePapers] = useState([]); // Holds all papers
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For displaying error messages

  useEffect(() => {
    fetchAllPapers();
  }, []);

  useEffect(() => {
    const { reviewerExpertise, reviewerName, feedback, score, paperTitle } = review;

    // Validate fields safely to avoid errors
    setIsFormValid(
      reviewerName.trim() !== "" &&
      reviewerExpertise.trim() !== "" &&
      feedback.trim() !== "" &&
      score.trim() !== "" &&
      paperTitle.trim() !== "" // Validate paperTitle
    );
  }, [review]);

  // Fetch all papers from the `paper-submit` API and set the first paper as default
  const fetchAllPapers = async () => {
    setLoading(true);
    setError("");
    try {
      const papersResponse = await axios.get("/api/paper-submit"); // Fetch all submissions
      const papers = papersResponse.data;

      setAvailablePapers(papers);

      if (papers.length > 0) {
        const firstPaper = papers[0];
        // Set the first paper as the default selection
        setReview((prevState) => ({
          ...prevState,
          submissionId: firstPaper.id,
          paperTitle: firstPaper.paper_title,
          filePath: firstPaper.file_path,
        }));
      }

      setSubmissionStatus(
        papers.length === 0 ? "No papers available at the moment." : ""
      );
    } catch (error) {
      console.error("Error fetching papers:", error);
      setError("Error fetching papers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaperSelection = (event) => {
    const selectedPaperId = event.target.value;
    const selectedPaper = availablePapers.find((paper) => paper.id === parseInt(selectedPaperId));
    if (selectedPaper) {
      setReview((prevState) => ({
        ...prevState,
        submissionId: selectedPaper.id,
        paperTitle: selectedPaper.paper_title, // Auto-fill the paper title
        filePath: selectedPaper.file_path, // Store the file path of the selected paper
      }));
    }
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
    setError("");
    setSubmissionStatus("");

    // Validate the review object
    if (
      !review.submissionId ||
      review.paperTitle.trim() === "" ||
      review.reviewerName.trim() === "" ||
      review.reviewerExpertise.trim() === "" ||
      review.feedback.trim() === "" ||
      review.score.trim() === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Prepare the data to submit
      const { submissionId, paperTitle, reviewerName, reviewerExpertise, feedback, score } = review;
      const reviewData = { submissionId, paperTitle, reviewerName, reviewerExpertise, feedback, score };

      await axios.post("/api/reviews", reviewData); // Post review data

      // Show popup on success
      alert("Review submitted successfully!");

      // Reset review form
      setReview({
        submissionId: null,
        paperTitle: "",
        reviewerName: "",
        reviewerExpertise: "",
        feedback: "",
        score: "",
        filePath: "",
      });
      fetchAllPapers(); // Refresh papers list
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="peer-review-container" style={{ padding: "1rem" }}>
      {/* Paper Selection Dropdown */}
      <section className="paper-selection" style={{ marginBottom: "2rem" }}>
        <h2>Select a Paper</h2>
        <select
          value={review.submissionId || ""}
          onChange={handlePaperSelection}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {availablePapers.length === 0 ? (
            <option value="">-- No Papers Available --</option>
          ) : (
            availablePapers.map((paper) => (
              <option key={paper.id} value={paper.id}>
                {paper.paper_title} - {paper.subject}
              </option>
            ))
          )}
        </select>
      </section>

      {/* Error Messages */}
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      {/* PDF Viewer Section */}
      {review.filePath && (
        <section className="pdf-viewer-section" style={{ marginBottom: "2rem" }}>
          <iframe
            src={review.filePath}
            style={{
              width: "100%",
              height: "80vh", // Increase height to make it larger
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            title="Paper PDF"
          ></iframe>
        </section>
      )}

      {/* Review Form Section */}
      {review.submissionId && (
        <section className="review-section">
          <h2>Submit Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paperTitle">Paper Title:</label>
              <input
                type="text"
                id="paperTitle"
                name="paperTitle"
                value={review.paperTitle}
                onChange={handleChange} // Still allows manual edits if needed
                required
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewerName">Your Name:</label>
              <input
                type="text"
                id="reviewerName"
                name="reviewerName"
                value={review.reviewerName}
                onChange={handleChange}
                required
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewerExpertise">Your Expertise:</label>
              <input
                type="text"
                id="reviewerExpertise"
                name="reviewerExpertise"
                value={review.reviewerExpertise}
                onChange={handleChange}
                required
                style={{ width: "100%", marginBottom: "1rem" }}
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
                style={{ width: "100%", marginBottom: "1rem" }}
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
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!isFormValid || loading}
              style={{
                padding: "0.5rem 1rem",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default PeerReview;
