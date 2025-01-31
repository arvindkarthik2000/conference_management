import React, { useState } from 'react';
// import './PapersCRUD.css'
const PapersCRUD = () => {
  const [papers, setPapers] = useState([]);
  const [newPaper, setNewPaper] = useState({
    title: '',
    author: '',
    abstract: '',
    status: 'Invited', // can be 'Invited' or 'Submitted'
  });

  // Handle input change for new paper
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaper({ ...newPaper, [name]: value });
  };

  // Add a new paper
  const handleAddPaper = () => {
    setPapers([...papers, newPaper]);
    setNewPaper({
      title: '',
      author: '',
      abstract: '',
      status: 'Invited',
    });
  };

  // Delete a paper
  const handleDeletePaper = (index) => {
    const updatedPapers = papers.filter((_, i) => i !== index);
    setPapers(updatedPapers);
  };

  // Update a paper
  const handleUpdatePaper = (index) => {
    const updatedTitle = prompt('Update title', papers[index].title);
    const updatedAuthor = prompt('Update author', papers[index].author);
    const updatedAbstract = prompt('Update abstract', papers[index].abstract);
    const updatedStatus = prompt('Update status (Invited/Submitted)', papers[index].status);

    const updatedPapers = [...papers];
    updatedPapers[index] = {
      title: updatedTitle || updatedPapers[index].title,
      author: updatedAuthor || updatedPapers[index].author,
      abstract: updatedAbstract || updatedPapers[index].abstract,
      status: updatedStatus || updatedPapers[index].status,
    };
    setPapers(updatedPapers);
  };

  return (
    <div>
      <h2>Manage Papers</h2>

      <div className="form-group">
        <label>Paper Title</label>
        <input
          type="text"
          name="title"
          value={newPaper.title}
          onChange={handleInputChange}
          placeholder="Enter paper title"
          required
        />
      </div>

      <div className="form-group">
        <label>Author Name</label>
        <input
          type="text"
          name="author"
          value={newPaper.author}
          onChange={handleInputChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="form-group">
        <label>Abstract</label>
        <textarea
          name="abstract"
          value={newPaper.abstract}
          onChange={handleInputChange}
          placeholder="Enter paper abstract"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={newPaper.status} onChange={handleInputChange}>
          <option value="Invited">Invited</option>
          <option value="Submitted">Submitted</option>
        </select>
      </div>

      <button onClick={handleAddPaper}>Add Paper</button>

      <h3>Paper List</h3>
      <ul>
        {papers.map((paper, index) => (
          <li key={index}>
            <strong>{paper.title}</strong> by {paper.author}
            <br />
            <em>{paper.abstract}</em>
            <br />
            Status: {paper.status}
            <div>
              <button onClick={() => handleUpdatePaper(index)}>Update</button>
              <button onClick={() => handleDeletePaper(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PapersCRUD;
