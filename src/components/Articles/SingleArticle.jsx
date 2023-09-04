import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../../api";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
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
        <p>Votes: {article.votes}</p>
        <section className="article-bulk">
          <h3>By {article.author}</h3>
          <p className="article-body">{article.body}</p>
        </section>
      </section>
      <section>Placeholder for comments section</section>
    </section>
  );
};

export default SingleArticle;