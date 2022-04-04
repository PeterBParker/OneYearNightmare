import moment from "moment"
import { comment } from 'postcss';
import { useState } from 'react';
import PropTypes from "prop-types";
import CommentForm from './CommentForm';

/**
 * Renders a single comment with basic author information
 */
export function SingleComment(props) {
    return(
        <div>
            <div className="flex w-full">
                <div className="flex comment-avatar">
                    {<img
                        src={`https://avatars.dicebear.com/api/big-smile/${props.comment.author_name}}.svg`}
                        alt="avatar"
                        width={100}
                    />}
                </div>
                <div>
                    <div className="flex justify-between">
                        <p className="comment-author">
                            {props.comment.author_name}
                        </p>
                        <div className="comment-time">
                            {props.comment.time && (<time>{moment(props.comment.time.toDateString()).calendar()}</time>)}
                        </div>
                    </div>
                    <div className="comment-content">
                        {props.comment.content}
                    </div>
                </div>

            </div>
        </div>
    );
}

SingleComment.propTypes = {
    comment: PropTypes.object.isRequired
}

/**
 * Renders a comment with its replies and the opportunity to reply.
 */
export default function Comment(props) {
    const [showReplyBox, setShowReplyBox] = useState(false)
    return(
        <div className="comment-box">
            <SingleComment comment={props.comment} />
            {props.children && (props.children.map(child => {
                return(
                    <div className="comment-box comment-reply">
                        <SingleComment
                            comment={child}
                            key={child.id}
                        />
                    </div>
                )
            }))}
            {!props.children && (
                <div>
                    {showReplyBox ? (
                        <div>
                            <button className="cancel-btn btn" onClick={() => setShowReplyBox(false)}>
                                Cancel Reply
                            </button>
                            <CommentForm parentId={props.comment.id} slug={props.slug} />
                        </div>
                    ) : (
                        <button className="reply-btn btn" onClick={() => setShowReplyBox(true)}>
                            Reply
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.array
}