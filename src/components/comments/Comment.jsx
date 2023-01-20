import moment from "moment";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../..";
import { getDisplayName } from "../users/utils";
import EditCommentForm from "./EditCommentForm";
import CreateNewCommentForm from "./CreateNewCommentForm";
import { getAvatarUrl } from "../users/avatarHelpers";
import { Timestamp } from "firebase/firestore";

/**
 * Renders a single comment with basic author information
 */
export function SingleComment(props) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [belongsToCurrUser, setBelongsToCurrUser] = useState(
    auth.currentUser ? auth.currentUser.uid === props.comment.author_uid : false
  );
  const [avatarUrl, setAvatarUrl] = useState("");
  const accountDeletedDisplay = "Account Deleted";
  const commentDeletedContent = "This comment has been deleted.";

  useEffect(() => {
    let isMounted = true;
    if (props.comment.author_uid == null && isMounted) {
      setDisplayName(accountDeletedDisplay);
    } else {
      getDisplayName(props.comment.author_uid).then((display_name) => {
        if (isMounted) {
          setDisplayName(display_name);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    let isMounted = true;
    async function updateAvatar() {
      // We haven't gotten this user's avatar url yet so let's do that now
      let url = await getAvatarUrl(props.comment.author_uid);
      if (isMounted) {
        setAvatarUrl(url);
      }
    }
    updateAvatar();
    return () => {
      isMounted = false;
    };
  }, [props.comment.author_uid]);

  useEffect(() => {
    setBelongsToCurrUser(
      auth.currentUser
        ? auth.currentUser.uid === props.comment.author_uid
        : false
    );
  }, [props.comment.author_uid]);

  function getTimeString(commentTime) {
    const secondsInMin = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 60 * 60 * 24;

    // get the difference between current time and the timestamp, then print the
    let now = Timestamp.fromDate(new Date());
    let timeDiff = now.seconds - commentTime.seconds;

    if (timeDiff < secondsInMin) {
      // If time diff is less than a minute print "A few seconds ago"
      return "A few seconds ago";
    } else if (timeDiff < secondsInHour) {
      // If time diff is less than an hour print "x minutes ago"
      let numMin = Math.ceil(timeDiff / secondsInMin);
      return numMin + " minutes ago";
    } else if (timeDiff < secondsInDay) {
      // If time diff is less than a day print "x hours ago"
      let numHours = Math.ceil(timeDiff / secondsInHour);
      return numHours + " hours ago";
    } else {
      // Else print the numeric date string. Example: "Jan 18, 2022"
      let commentDate = commentTime.toDate();
      let formattedDate = new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(commentDate);
      return formattedDate;
    }
  }

  return (
    <div>
      <div className="mb-2 single-comment-container">
        <div className="flex mr-2 justify-start comment-avatar-container">
          <div>
            {
              <img
                src={avatarUrl}
                alt="avatar"
                width={70}
                className="comment-avatar"
              />
            }
          </div>
        </div>
        <div className="flex comment-data-header justify-between">
          <div className="flex flex-col">
            <div
              className={`comment-author font-medium text-left leading-5 ${
                displayName == accountDeletedDisplay ? "italic" : ""
              }`}
            >
              {displayName}
            </div>
            <div className="comment-time mr-2 text-mocha-dark text-xs leading-4 md:text-sm md:leading-5 text-left">
              {getTimeString(props.comment.time_created)}
            </div>
          </div>
        </div>
        {editComment && belongsToCurrUser ? (
          <EditCommentForm
            initialContent={props.comment.content}
            slug={props.slug}
            callback={() => setEditComment(false)}
            comment={props.comment}
          />
        ) : (
          <div
            className={`comment-content text-left ${
              props.comment.content == null ? "italic" : ""
            }`}
          >
            {props.comment.content != null
              ? props.comment.content
              : commentDeletedContent}

            <div className="flex not-italic justify-start comment-interaction-container">
              {showReplyBox ? (
                <span
                  className="cancel-btn btn text-left font-medium text-green-dark"
                  onClick={() => setShowReplyBox(false)}
                >
                  Cancel
                </span>
              ) : (
                <div className="w-full">
                  {props.isTopLevel ? (
                    <span
                      className="reply-btn btn text-left font-medium text-green-dark float-left"
                      onClick={() => setShowReplyBox(true)}
                    >
                      Reply
                    </span>
                  ) : null}

                  {belongsToCurrUser ? (
                    <span
                      className="reply-btn btn text-left font-medium text-green-dark float-right"
                      onClick={() => setEditComment(true)}
                    >
                      Edit
                    </span>
                  ) : null}
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
        )}
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
