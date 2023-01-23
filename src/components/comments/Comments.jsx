import PropTypes from "prop-types";

import Comment from "./Comment";
import Title from "../generic/Title";
import { useState } from "react";
import { SIGNIN_PAGE_PATH } from "../Main";
import LinkButton from "../generic/LinkButton";
import { auth } from "../../index";
import useFirebaseAuth from "../users/hooks/useFirebaseAuth";
import CreateNewCommentForm from "./CreateNewCommentForm";

/**
 * Renders supplied comment data.
 */
export default function Comments(props) {
  const [showCommentSubmit, setShowCommentSubmit] = useState(false);
  const authUser = useFirebaseAuth(auth);

  return (
    <div className="comments-container border-b border-mocha-dark lg:border-t-2 lg:border-r-2 lg:border-b-2 lg:border-l">
      <div className="py-4 px-8 bg-eggshell text-left flex flex-row items-center comments-title">
        <Title text="Comments //" />
      </div>

      <div className="comment-list">
        {/* If there are comments, create a Comment component for each */}
        {props.comments.length > 0 &&
          props.comments
            .filter((comment) => !comment.parent_comment_id)
            .map((comment) => {
              /* Get comments replying to it.*/
              let children;
              if (comment.id) {
                children = props.comments.filter(
                  (c) => comment.id == c.parent_comment_id
                );
              }
              return (
                <Comment
                  key={comment.id}
                  children={children}
                  comment={comment}
                  slug={props.slug}
                />
              );
            })}
      </div>
      {authUser && authUser.displayName != null ? (
        showCommentSubmit ? (
          <div className="mx-4 my-4">
            <CreateNewCommentForm
              slug={props.slug}
              callback={() => setShowCommentSubmit(false)}
            />
            <div
              className="cancel-comment-btn btn font-medium py-1 bg-eggshell grow-btn rounded-lg mt-2"
              onClick={(e) => setShowCommentSubmit(false)}
            >
              Cancel
            </div>
          </div>
        ) : (
          <div
            className="grow-btn my-4 py-2 mx-4 btn bg-eggshell font-medium"
            onClick={(e) => setShowCommentSubmit(true)}
          >
            Add Comment
          </div>
        )
      ) : (
        <LinkButton
          to={SIGNIN_PAGE_PATH}
          styles="grow-btn btn my-4 py-2 mx-4 btn  bg-cream-dark font-medium not-italic rounded"
          buttonContent="Log In"
        />
      )}
    </div>
  );
}

Comments.propTypes = {
  slug: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};
