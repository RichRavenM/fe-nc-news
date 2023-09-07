import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../api";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
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
            <h1>Loading...</h1>
          </div>
        </div>
      </>
    );
  if (isError)
    return (
      <div>
        <h1>Error. Please try again</h1>
        <img
          className="error-bot"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGpkanIxNTNkOGp2emF6bWE4ejFwcTFldHBxZ3RkZXduZGUzNnJ1dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lRSeZ2ddNwhZ5AgIvk/giphy.gif"
          alt="A sad face"
        ></img>
      </div>
    );

  return (
    <section className="topics">
      <h2>Topics</h2>
      <p>Click on the various topics to search articles by a specfic topic</p>
      <ul className="topics-list">
        {topics.map((topic) => {
          return (
            <li className="topic-ele" key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`}>
                <h3 className="topic-slug">
                  {topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)}
                </h3>
              </Link>
              <p className="topic-description">{topic.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Topics;
