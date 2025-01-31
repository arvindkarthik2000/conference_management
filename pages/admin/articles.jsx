import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticlesCRUD = () => {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({ id: '', name: '', date: '', location: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get('/api/articles');
    setArticles(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleAddArticle = async () => {
    if (editMode) {

      await axios.put(`/api/articles`, article, { params: { id: article.id } });
      setEditMode(false);
    } else {

      const response = await axios.post('/api/articles', article);
      setArticles([...articles, response.data]);
    }
    setArticle({ id: '', name: '', date: '', location: '' });
    fetchArticles();
  };

  const handleEditArticle = (conf) => {
    setArticle(conf)
    setEditMode(true);
  };

  const handleDeleteArticles = async (id) => {
    await axios.delete(`/api/articles?id=${id}`);
    setArticles(articles.filter((conf) => conf.id !== id));
  };

  return (
    <div className="conference-crud">
      <h2>Manage Articles</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Article Name"
          value={article.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Article Link"
          value={article.location}
          onChange={handleInputChange}
        />
        <button onClick={handleAddArticle}>{editMode ? 'Update' : 'Add'} Article</button>
      </div>

      <br />
      <h3>Articles List</h3>
      <ul>
        {articles.map((conf) => (
          <li key={conf.id}>
            {conf.name} - {conf.location}
            <button onClick={() => handleEditArticle(conf)}>Edit</button>
            <button onClick={() => handleDeleteArticles(conf.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesCRUD;
