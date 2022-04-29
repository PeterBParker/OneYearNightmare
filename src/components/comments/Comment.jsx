import moment from "moment"
import { comment } from 'postcss';
import { useState } from 'react';
import PropTypes from "prop-types";
import CommentForm from './CommentForm';

/**
 * Renders a single comment with basic author information
 */
export function SingleComment(props) {
    const [showReplyBox, setShowReplyBox] = useState(false)
    return(
        <div>
            <div className="flex mb-2">
                <div className="flex mr-2 justify-start">
                    <div>
                        {<img
                            src={`https://avatars.dicebear.com/api/big-smile/${props.comment.author_name}}.svg`}
                            alt="avatar"
                            width={80}
                            className=" comment-avatar"
                        />}
                    </div>

                </div>
                <div className="w-full">
                    <div className="flex justify-between">
                        <p className="comment-author font-medium text-left">
                            {props.comment.author_name}
                        </p>
                        <div className="comment-time mr-2 text-mocha-dark">
                            {props.comment.time && (<time>{moment(props.comment.time.toDateString()).calendar()}</time>)}
                        </div>
                    </div>
                    <div className="comment-content text-left">
                        {props.comment.content}
                    </div>
                    {props.isTopLevel ? (
                        <div>
                            <div className="flex justify-start">
                                {showReplyBox ? (
                                    <span className="cancel-btn btn text-left font-medium text-green-dark" onClick={() => setShowReplyBox(false)}>
                                        Cancel Reply
                                    </span>
                                ) : (
                                    <span className="reply-btn btn text-left font-medium text-green-dark" onClick={() => setShowReplyBox(true)}>
                                        Reply
                                    </span>
                                )}
                            </div>
                            {showReplyBox ? (
                                <CommentForm parentId={props.comment.id} slug={props.slug} />
                            ): null}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

SingleComment.propTypes = {
    comment: PropTypes.object.isRequired,
    isTopLevel: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired
}

/**
 * Renders a comment with its replies and the opportunity to reply.
 */
export default function Comment(props) {
    
    return(
        <div className="comment-box mx-4 my-2 pl-2 pr-6 py-2">
            <SingleComment comment={props.comment} isTopLevel={true} slug={props.slug}/>
            {props.children && (props.children.map(child => {
                return(
                    <div className="comment-reply ml-6 my-2">
                        <SingleComment
                            comment={child}
                            key={child.id}
                            isTopLevel={false}
                        />
                    </div>
                )
            }))}
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.array
}