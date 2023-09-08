import { postArticle } from "../../../api";
import { useContext, useState } from "react";
import { TopicsContext } from "../../Contexts/TopicsContext";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";

const AddArticle = () => {
  const { user } = useContext(UserContext);
  const { topics } = useContext(TopicsContext);
  const [topicToSelect, setTopicToSelect] = useState("Coding");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [article_img_url, setArticle_img_url] = useState("");
  const [isTitleValid, setIsTitleValid] = useState("");
  const [isBodyValid, setIsBodyValid] = useState("");
  const [isURLValid, setIsURLValid] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topicsList = topics.map(
    (topic) => topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsError(false);
    postArticle(user, topicToSelect.toLowerCase(), title, body, article_img_url)
      .then(() => {
        setIsSubmitted(true);
        setTitle("");
        setBody("");
        setArticle_img_url("");
        setTopicToSelect("Coding");
        setIsTitleValid("");
        setIsBodyValid("");
        setIsURLValid("");
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const returnToSubmit = () => {
    setIsSubmitted(false);
  };

  const handleTopicChange = (event) => {
    setTopicToSelect(event.target.value);
  };

  const handleTitleChange = (event) => {
    if (event.target.value.length >= 10) {
      setIsTitleValid(true);
    } else {
      setIsTitleValid(false);
    }
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    if (event.target.value.length >= 100) {
      setIsBodyValid(true);
    } else {
      setIsBodyValid(false);
    }
    setBody(event.target.value);
  };

  const handleURLChange = (event) => {
    if (
      /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/g.test(
        event.target.value
      )
    ) {
      setIsURLValid(true);
    } else {
      setIsURLValid(false);
    }
    setArticle_img_url(event.target.value);
  };

  if (isSubmitted) {
    return (
      <div className="success-page">
        <h2>Nice one! You submitted that article!</h2>
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDR4a3A2bnN2aGNtaWg3b29qaG9mdGlmM2FtZjN1NDd2Y3U4MWoyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XreQmk7ETCak0/giphy.gif"
          alt="kid giving thumbs up at computer gif"
        ></img>
        <div>
          <Link onClick={returnToSubmit}>
            <p id="article-success">Submit another post</p>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <h2>Submit an Article</h2>
      <form onSubmit={handleSubmit} className="new-article-form">
        <label className="add-article-label" htmlFor="topics-select">
          Topic
        </label>
        <select
          id="topics-select"
          value={topicToSelect}
          onChange={handleTopicChange}
        >
          {topicsList.map((topic) => {
            return <option>{topic}</option>;
          })}
        </select>
        <label className="add-article-label" htmlFor="new-article-title">
          Title
        </label>
        <input
          className={
            isTitleValid === true
              ? "comment-form-valid"
              : isTitleValid === false
              ? "comment-form-invalid"
              : null
          }
          onChange={handleTitleChange}
          value={title}
          id="new-article-title"
          placeholder="New title. Minimum 10 characters"
        ></input>
        {isTitleValid === false ? (
          <p>Please submit a title with at least 10 characters</p>
        ) : null}
        <label className="add-article-label" htmlFor="new-article-body">
          Article
        </label>
        <textarea
          className={
            isBodyValid === true
              ? "comment-form-valid"
              : isBodyValid === false
              ? "comment-form-invalid"
              : null
          }
          onChange={handleBodyChange}
          value={body}
          id="new-article-body"
          placeholder="Article body. Minimum 100 characters"
        ></textarea>
        {isBodyValid === false ? (
          <p>Please submit an article with at least 100 characters</p>
        ) : null}
        <label className="add-article-label" htmlFor="new-article-url">
          Image URL
        </label>
        <input
          className={
            isURLValid === true
              ? "comment-form-valid"
              : isURLValid === false
              ? "comment-form-invalid"
              : null
          }
          onChange={handleURLChange}
          value={article_img_url}
          id="new-article-url"
          placeholder="Please include a valid url"
        ></input>
        {isURLValid === false ? <p>Please submit a valid image URL</p> : null}
        <button
          className="article-submit-button"
          disabled={
            isBodyValid !== true || isTitleValid !== true || isURLValid !== true
          }
        >
          Submit Article
        </button>
        {isError ? (
          <p>
            There was a problem submitting your article. Please try again later
          </p>
        ) : null}
      </form>
    </>
  );
};

export default AddArticle;
