import { useState, useEffect } from "react";
import { getArticleById, patchArticleVotes } from "../../../../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import ArticleButton from "../ArticleButton";

const SingleArticle = () => {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVoteError, setIsVoteError] = useState(null);
  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <>
        <div className="modal-box">
          <div className="modal-content">
            <h1 className="modal-h1">Loading...</h1>
          </div>
        </div>
      </>
    );

  if (isError)
    return (
      <>
        <h2>Error. Please try again with valid article id</h2>
        <img
          className="error-bot"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGpkanIxNTNkOGp2emF6bWE4ejFwcTFldHBxZ3RkZXduZGUzNnJ1dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lRSeZ2ddNwhZ5AgIvk/giphy.gif"
          alt="A sad face"
        ></img>
      </>
    );
  return (
    <section className="single-article">
      <section className="article-to-show">
        <h1 className="single-article-title">{article.title}</h1>
        <p>{article.created_at.slice(0, 10)}</p>
        <h2>
          {article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)}
        </h2>
        <img
          className="article-img"
          src={article.article_img_url}
          alt={article.title}
        ></img>
        <div>
          <p>Votes: {article.votes}</p>
          <ArticleButton
            article={article}
            setIsVoteError={setIsVoteError}
            setArticle={setArticle}
          />
          {isVoteError ? <p>{isVoteError}</p> : null}
        </div>
        <section className="article-bulk">
          <h3>By {article.author}</h3>
          <p className="article-body">{article.body}</p>
        </section>
      </section>
      <Comments article_id={article_id} />
    </section>
  );
};

export default SingleArticle;
