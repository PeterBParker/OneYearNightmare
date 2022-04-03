import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/big-smile';
import moment from "moment"
import { comment } from 'postcss';
import { useState } from 'react';

/**
 * Renders a single comment with basic author information
 */
function SingleComment(props) {
    const avatar = createAvatar(style, {
        seed: props.comment.author_name
    })
    return(
        <div>
            <div className="flex-container">
                <div className="flex comment-avatar">
                    <img
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                <div className="flex">
                    <p className="comment-author">
                        {props.comment.author_name} <span>says</span>
                    </p>
                    <div className="comment-time">
                        {props.comment.time && (<time>{moment(comment.time.toDate()).calendar()}</time>)}
                    </div>
                </div>
                <div className="comment-content">
                    {comment.content}
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
            {children && (children.map(child => {
                return(
                    <div className="comment-box comment-reply">
                        <SingleComment
                            comment={child}
                            key={child.id}
                        />
                    </div>
                )
            }))}
            {!children && (
                <div>
                    {showReplyBox ? (
                        <div>
                            <button className="cancel-btn btn" onClick={() => setShowReplyBow(false)}>
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