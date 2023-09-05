import { useState, useEffect } from "react";
import { getCommentByArticleById } from "../../../../api";
import MakeComment from "./MakeComment";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCommentByArticleById(article_id)
      .then((data) => {
        setComments(data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error. Comments could not load at this time</h1>;

  return (
    <>
      <MakeComment
        article_id={article_id}
        comments={comments}
        setComments={setComments}
      />
      <h2>Comments</h2>
      <ul className="comments">
        {comments.map((comment) => {
          return (
            <li className="comment" key={comment.comment_id}>
              <p className="comment-body">{comment.body}</p>
              <h3 className="comment-author">{comment.author}</h3>
              <div className="comment-info">
                <p className="comment-creation">
                  {comment.created_at.slice(0, 10)}
                </p>
                <p className="comment-votes">Votes: {comment.votes}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
