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

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error. Please try again</h1>;

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
