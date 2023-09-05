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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setIsSubmitError(false);
    postCommentByArticleId(article_id, user, formInput)
      .then((data) => {
        setComments((currComments) => {
          return [data, ...currComments];
        });
        setIsLoading(false);
        setFormInput("");
        setIsSubmitSuccess(true);
      })
      .catch((err) => {
        setIsSubmitError(true);
        setIsLoading(false);
      });
  };

  if (isLoading) return <h3>Loading...</h3>;

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
