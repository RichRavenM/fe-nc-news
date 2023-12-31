import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { getCommentByArticleById, deleteCommentById } from "../../../../api";
import MakeComment from "./MakeComment";

const Comments = ({ article_id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [commentById, setCommentById] = useState(null);

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

  const handleDelete = (comment) => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      setCommentById(null);
      setIsDeleteError(false);
      const copyComments = [...comments];
      setComments((currComments) => {
        const filteredComments = currComments.filter(
          (currComment) => currComment.comment_id !== comment.comment_id
        );
        return filteredComments;
      });
      alert("Comment deleted");
      deleteCommentById(comment.comment_id).catch((err) => {
        setCommentById(comment.comment_id);
        setIsDeleteError(true);
        setComments(copyComments);
      });
    }
  };

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
        {comments.length > 0 ? (
          comments.map((comment) => {
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
                <div className="delete-button-container">
                  <button
                    disabled={comment.author !== user}
                    className="delete-button"
                    onClick={() => {
                      handleDelete(comment);
                    }}
                  >
                    Delete Comment
                  </button>
                  {isDeleteError && commentById === comment.comment_id ? (
                    <p className="comment-delete-error">
                      Please refesh the page and try again
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })
        ) : (
          <h2>No comments at this time</h2>
        )}
      </ul>
    </>
  );
};

export default Comments;
