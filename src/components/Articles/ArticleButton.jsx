import { useState } from "react";
import { patchArticleVotes } from "../../../api";

const ArticleButton = ({ article, setIsVoteError, setArticle }) => {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);

  const changeLike = (article, num, button) => {
    const copyArticle = { ...article };
    if (num === 1) {
      copyArticle.votes++;
    } else {
      copyArticle.votes--;
    }
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        if (button === "like") {
          setIsLikeClicked(!isLikeClicked);
        } else {
          setIsDislikeClicked(!isDislikeClicked);
        }
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  return (
    <div>
      <button
        disabled={isDislikeClicked}
        className={isLikeClicked ? "clicked-like" : null}
        onClick={() => {
          if (isLikeClicked) {
            changeLike(article, -1, "like");
          } else {
            changeLike(article, 1, "like");
          }
        }}
      >
        Like <br></br>
        <img
          className="thumbs"
          src="https://cdn-icons-png.flaticon.com/512/2415/2415418.png"
          alt="thumb-up"
        ></img>
      </button>
      <button
        className={`${isDislikeClicked ? "clicked-dislike" : null} like`}
        disabled={isLikeClicked}
        onClick={() => {
          if (isDislikeClicked) {
            changeLike(article, 1, "dislike");
          } else {
            changeLike(article, -1, "dislike");
          }
        }}
      >
        Dislike <br></br>
        <img
          className="thumbs"
          src="https://cdn-icons-png.flaticon.com/512/1633/1633636.png"
        ></img>
      </button>
    </div>
  );
};

export default ArticleButton;
