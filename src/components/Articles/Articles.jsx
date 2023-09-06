import { useState, useEffect } from "react";
import { getArticles } from "../../../api";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filters";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVoteError, setIsVoteError] = useState(null);
  const copyParams = { ...searchParams };
  const sortByTopic = searchParams.get("topic");
  const sortByX = searchParams.get("sort_by");
  const sortByOrder = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortByTopic, sortByX, sortByOrder)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotal(total_count);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [searchParams]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return (
      <>
        <h2>
          Error. Please try again with a valid topic. See the topics section
          above for an up-to-date list
        </h2>
        <img
          className="error-bot"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGpkanIxNTNkOGp2emF6bWE4ejFwcTFldHBxZ3RkZXduZGUzNnJ1dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lRSeZ2ddNwhZ5AgIvk/giphy.gif"
          alt="A sad face"
        ></img>
      </>
    );

  return (
    <>
      <Filters
        copyParams={copyParams}
        sortByTopic={sortByTopic}
        setSearchParams={setSearchParams}
        sortByOrder={sortByOrder}
        sortByX={sortByX}
      />
      <h3>Total articles: {total}</h3>
      <ul className="articles-container">
        {articles.map((article) => {
          return (
            <li key={article.article_id} className="article link">
              <Link
                to={`${location.pathname}/${article.article_id}`}
                className="article-title"
              >
                <h2>{article.title}</h2>
              </Link>
              <Link to={`/articles?topic=${article.topic}`}>
                <h4
                  className="article-topic link"
                  onClick={() => {
                    setSearchParams((currParams) => {
                      return { ...currParams, topic: article.topic };
                    });
                  }}
                >
                  {article.topic.slice(0, 1).toUpperCase() +
                    article.topic.slice(1)}
                </h4>
              </Link>
              <div className="article-info">
                <div className="creation-facts">
                  <p className="article-author">{article.author}</p>
                  <p className="article-creation">
                    {article.created_at.slice(0, 10)}
                  </p>
                </div>
                <div className="article-votes-comments">
                  <p>Comments: {article.comment_count}</p>
                  <p>Votes: {article.votes}</p>
                </div>
                <img
                  className="article-img"
                  src={article.article_img_url}
                ></img>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Articles;
