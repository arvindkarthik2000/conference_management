import React, { useState } from 'react';
// import './ArticlesCRUD.css'
const ArticlesCRUD = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    author: '',
  });

  // Handle input change for new article
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  // Add a new article
  const handleAddArticle = () => {
    setArticles([...articles, newArticle]);
    setNewArticle({
      title: '',
      content: '',
      author: '',
    });
  };

  // Delete an article
  const handleDeleteArticle = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
  };

  // Update an article
  const handleUpdateArticle = (index) => {
    const updatedTitle = prompt('Update article title', articles[index].title);
    const updatedContent = prompt('Update article content', articles[index].content);
    const updatedAuthor = prompt('Update article author', articles[index].author);

    const updatedArticles = [...articles];
    updatedArticles[index] = {
      title: updatedTitle || updatedArticles[index].title,
      content: updatedContent || updatedArticles[index].content,
      author: updatedAuthor || updatedArticles[index].author,
    };
    setArticles(updatedArticles);
  };

  return (
    <div>
      <h2>Manage Articles</h2>

      <div className="form-group">
        <label>Article Title</label>
        <input
          type="text"
          name="title"
          value={newArticle.title}
          onChange={handleInputChange}
          placeholder="Enter article title"
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          name="content"
          value={newArticle.content}
          onChange={handleInputChange}
          placeholder="Enter article content"
          required
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={newArticle.author}
          onChange={handleInputChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <button onClick={handleAddArticle}>Add Article</button>

      <h3>Article List</h3>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <strong>Title:</strong> {article.title} | <strong>Author:</strong> {article.author}
            <div>
              <button onClick={() => handleUpdateArticle(index)}>Update</button>
              <button onClick={() => handleDeleteArticle(index)}>Delete</button>
            </div>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesCRUD;
