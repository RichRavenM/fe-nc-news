import axios from "axios";

export const getArticles = () => {
  return axios
    .get("https://nc-news-api-rich.onrender.com/api/articles?total_count=1")
    .then((response) => {
      return response.data;
    });
};

export const getArticleById = (id) => {
  return axios
    .get(`https://nc-news-api-rich.onrender.com/api/articles/${id}`)
    .then((response) => {
      return response.data.article;
    });
};

export const getCommentByArticleById = (id) => {
  return axios
    .get(`https://nc-news-api-rich.onrender.com/api/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};
