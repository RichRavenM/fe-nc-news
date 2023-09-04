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
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
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

  const addLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes++;
    setArticle(copyArticle);
    setIsVoteError(null);
    console.log(isVoteError);
    patchArticleVotes(article.article_id, num).catch((error) => {
      setIsVoteError("Something went wrong. Please try again");
    });
  };

  const takeLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes--;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num).catch((error) => {
      setIsVoteError("Something went wrong. Please try again");
    });
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error. Please try again with valid article id</h1>;
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
