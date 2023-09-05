import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { postCommentByArticleId } from "../../../../api";

const MakeComment = ({ article_id, comments, setComments }) => {
  const { user } = useContext(UserContext);
  const [formInput, setFormInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidAfterInput, setIsValidAfterInput] = useState("");
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validateForm = (input) => {
    if (input.length > 9) {
      setIsValid(true);
      setIsValidAfterInput(true);
    } else {
      setIsValid(false);
      setIsValidAfterInput(false);
    }
  };

  const handleChange = (event) => {
    setFormInput(event.target.value);
    validateForm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const copyComments = [...comments];
    setIsSubmitError(false);
    const currentDate = new Date().toJSON().slice(0, 10);
    const newComment = {
      comment_id: Math.round(Math.random() * 1000000),
      author: user,
      body: formInput,
      created_at: currentDate,
    };
    setComments((currComments) => {
      return [newComment, ...currComments];
    });
    setFormInput("");
    setIsSubmitSuccess(true);
    postCommentByArticleId(article_id, user, formInput).catch((err) => {
      setComments(copyComments);
      setIsSubmitSuccess(false);
      setIsSubmitError(true);
    });
  };

  return (
    <div className="comment-form">
      <h3>Have anything to say?</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment-form-input"
          id="comment-form-input"
          type="text-area"
          placeholder="Enter comment. Miminum length – 10 characters"
          value={formInput}
          onChange={handleChange}
          className={
            isValidAfterInput === true
              ? "comment-form-valid"
              : isValidAfterInput === false
              ? "comment-form-invalid"
              : null
          }
        />
        <br></br>
        <button disabled={!isValid}>Submit comment</button>
        {isValidAfterInput === false ? (
          <p>Please submit a comment with at least 10 characters</p>
        ) : null}
        {isSubmitError ? (
          <p>
            There was a problem submitting your comment. Please try again later
          </p>
        ) : null}
        {isSubmitSuccess ? (
          <p>Your comment has been successfully submitted!</p>
        ) : null}
      </form>
    </div>
  );
};

export default MakeComment;
