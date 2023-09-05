import axios from "axios";

export const getArticles = (sortByTopic) => {
  return axios
    .get("https://nc-news-api-rich.onrender.com/api/articles", {
      params: {
        total_count: "1",
        topic: sortByTopic,
      },
    })
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

export const patchArticleVotes = (id, num) => {
  return axios.patch(
    `https://nc-news-api-rich.onrender.com/api/articles/${id}`,
    { inc_votes: num }
  );
};

export const postCommentByArticleId = (id, user, body) => {
  return axios
    .post(`https://nc-news-api-rich.onrender.com/api/articles/${id}/comments`, {
      username: user,
      body,
    })
    .then((response) => {
      return response.data.comment;
    });
};

export const getTopics = () => {
  return axios
    .get("https://nc-news-api-rich.onrender.com/api/topics")
    .then((response) => {
      return response.data.topics;
    });
};
