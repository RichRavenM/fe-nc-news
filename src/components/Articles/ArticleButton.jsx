import { useState } from "react";
import { patchArticleVotes } from "../../../api";

const ArticleButton = ({ article, setIsVoteError, setArticle }) => {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);

  const addLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes++;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsLikeClicked(true);
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const removeAddedLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes--;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsLikeClicked(false);
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const takeLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes--;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsDislikeClicked(true);
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const removeTakenLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes++;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsDislikeClicked(false);
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
            removeAddedLike(article, -1);
          } else {
            addLike(article, 1);
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
            removeTakenLike(article, 1);
          } else {
            takeLike(article, -1);
          }
        }}
      >
        Dislike
      </button>
    </div>
  );
};

export default ArticleButton;
