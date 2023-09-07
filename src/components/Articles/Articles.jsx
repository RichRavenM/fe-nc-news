import { useState, useEffect } from "react";
import { getArticles } from "../../../api";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import Pages from "./Pages";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState([]);

  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTotal, setPageTotal] = useState(1);
  const [isError, setIsError] = useState(false);
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
        setPageTotal(Math.ceil(total_count / limit));
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [searchParams]);

  if (isLoading)
    return (
      <>
        <div className="modal-box">
          <div className="modal-content">
            <h1>Loading...</h1>
          </div>
        </div>
      </>
    );
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
      <Pages pageTotal={pageTotal} page={page} setPage={setPage} />
      <ul className="articles-container">
        {articles.map((article, i) => {
          if (i >= (page - 1) * limit && i < page * limit) {
            return (
              <Link to={`${location.pathname}/${article.article_id}`}>
                <li
                  key={article.article_id}
                  className="article"
                  style={{
                    backgroundImage: `url(${article.article_img_url})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="article-main">
                    <p className="article-title">{article.title}</p>
                    <p className="article-topic link">
                      {article.topic.slice(0, 1).toUpperCase() +
                        article.topic.slice(1)}
                    </p>
                  </div>

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
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </>
  );
};

export default Articles;
