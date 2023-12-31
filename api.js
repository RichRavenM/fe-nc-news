import axios from "axios";

export const getArticles = (sortByTopic = undefined, sortByX, sortByOrder) => {
  return axios
    .get("https://nc-news-api-rich.onrender.com/api/articles", {
      params: {
        total_count: "1",
        topic: sortByTopic,
        sort_by: sortByX,
        order: sortByOrder,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const postArticle = (author, topic, title, body, article_img_url) => {
  return axios
    .post("https://nc-news-api-rich.onrender.com/api/articles", {
      author,
      topic,
      title,
      body,
      article_img_url,
    })
    .then((response) => {
      return response.data.article;
    });
};

export const getArticleById = (id) => {
  return axios
    .get(`https://nc-news-api-rich.onrender.com/api/articles/${id}`)
    .then((response) => {
      return response.data.article;
    });
};

export const patchArticleVotes = (id, num) => {
  return axios.patch(
    `https://nc-news-api-rich.onrender.com/api/articles/${id}`,
    { inc_votes: num }
  );
};

export const getCommentByArticleById = (id) => {
  return axios
    .get(`https://nc-news-api-rich.onrender.com/api/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
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

export const deleteCommentById = (id) => {
  return axios.delete(
    `https://nc-news-api-rich.onrender.com/api/comments/${id}`
  );
};

export const getTopics = () => {
  return axios
    .get("https://nc-news-api-rich.onrender.com/api/topics")
    .then((response) => {
      return response.data.topics;
    });
};
