import moment from "moment";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import { auth } from "../..";
import { db } from "../../index";
import { doc, getDoc } from "firebase/firestore";
import { getDisplayName } from "../users/utils";
import EditCommentForm from "./EditCommentForm";
import CreateNewCommentForm from "./CreateNewCommentForm";

/**
 * Renders a single comment with basic author information
 */
export function SingleComment(props) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [belongsToCurrUser, setBelongsToCurrUser] = useState(auth.currentUser ? auth.currentUser.uid === props.comment.author_uid : false)

  useEffect(() => {
    getDisplayName(props.comment.author_uid).then((display_name) => {
      setDisplayName(display_name);
    });
  });

  useEffect(() => {
    setBelongsToCurrUser(auth.currentUser ? auth.currentUser.uid === props.comment.author_uid : false)
  }, [auth.currentUser])

  return (
    <div>
      <div className="mb-2 single-comment-container">
        <div className="flex mr-2 justify-start comment-avatar-container">
          <div>
            {
              <img
                src={`https://avatars.dicebear.com/api/big-smile/${displayName}}.svg`}
                alt="avatar"
                width={70}
                className="comment-avatar"
              />
            }
          </div>
        </div>
        <div className="flex comment-data-header justify-between">
          <p className="comment-author font-medium text-left">
            {displayName}
          </p>
          <div className="comment-time mr-2 text-mocha-dark">
            {props.comment.time && (
              <time>
                {moment(props.comment.time.toDateString()).calendar()}
              </time>
            )}
          </div>
        </div>
        {editComment && belongsToCurrUser ?
          <EditCommentForm
            initialContent={props.comment.content}
            slug={props.slug}
            callback={() => setEditComment(false)}
            comment={props.comment} />
          :
          <div className="comment-content text-left">
            {props.comment.content}
          
            <div className="flex justify-start comment-interaction-container">
              {showReplyBox ? (
                <span
                  className="cancel-btn btn text-left font-medium text-green-dark"
                  onClick={() => setShowReplyBox(false)}
                >
                  Cancel Reply
                </span>
              ) : (
                <div className="w-full">
                  {
                    props.isTopLevel && auth.currentUser != null ?
                      <span
                        className="reply-btn btn text-left font-medium text-green-dark float-left"
                        onClick={() => setShowReplyBox(true)}
                      >
                        Reply
                      </span>
                      :
                      null
                  }

                  {belongsToCurrUser ?
                    <span
                      className="reply-btn btn text-left font-medium text-green-dark float-right"
                      onClick={() => setEditComment(true)}
                    >
                      Edit
                    </span>
                    :
                    null
                  }
                </div>

              )}
            </div>
            {showReplyBox ? (
              <CreateNewCommentForm
                parentId={props.comment.id}
                slug={props.slug}
                callback={() => setShowReplyBox(false)}
              />
            ) : null}
          </div>
        }
      </div>
    </div>
  );
}

SingleComment.propTypes = {
  comment: PropTypes.object.isRequired,
  isTopLevel: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

/**
 * Renders a comment with its replies and the opportunity to reply.
 */
export default function Comment(props) {
  return (
    <div className="comment-box mx-4 my-2 pl-2 pr-6 py-2">
      <SingleComment
        comment={props.comment}
        isTopLevel={true}
        slug={props.slug}
        key={props.comment.id}
      />
      {props.children &&
        props.children.map((child) => {
          return (
            <div className="comment-reply ml-6 my-2" key={child.id}>
              <SingleComment
                comment={child}
                isTopLevel={false}
                slug={props.slug}
              />
            </div>
          );
        })}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  children: PropTypes.array,
};
