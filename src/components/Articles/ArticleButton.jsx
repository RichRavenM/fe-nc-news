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
        Like
      </button>
      <button
        className={isDislikeClicked ? "clicked-dislike" : null}
        disabled={isLikeClicked}
        onClick={() => {
          if (isDislikeClicked) {
            changeLike(article, 1, "dislike");
          } else {
            changeLike(article, -1, "dislike");
          }
        }}
      >
        Dislike
      </button>
    </div>
  );
};

export default ArticleButton;
