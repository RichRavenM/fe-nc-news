import { createContext, useState, useEffect } from "react";
import { getTopics } from "../../api";
export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
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

  return (
    <TopicsContext.Provider value={{ topics, isLoading, isError }}>
      {children}
    </TopicsContext.Provider>
  );
};
