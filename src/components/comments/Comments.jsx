import PropTypes from "prop-types"

import Comment from "./Comment"
import CommentForm from "./CommentForm"
import Title from "../generic/Title";
import { useState } from "react";

/**
 * Renders supplied comment data.
 */
export default function Comments(props){
    const [showCommentSubmit, setShowCommentSubmit] = useState(false);

    return(
        <div className="comments-container desktopPageCommentsContainer ">
            <div className="py-4 px-8 bg-eggshell text-left flex flex-row items-center">
                <Title text="Comments //"/>
            </div>
            
            <div className="comment-list">
                {/* If there are comments, create a Comment component for each */}
                {props.comments.length > 0 &&
                    props.comments
                        .filter(comment => !comment.parent_comment_id)
                        .map( comment => {
                            {/* Get comments replying to it.*/}
                            let children
                            if (comment.id) {
                                children = props.comments.filter(c => comment.id == c.parent_comment_id)
                            }
                            return (
                                <Comment
                                    key={comment.id}
                                    children={children}
                                    comment={comment}
                                    slug={props.slug}
                                />
                            )
                        })}
            </div>
            {showCommentSubmit ? (
                <div>
                    <CommentForm slug={props.slug}/>
                    <button className="cancel-comment-btn" onClick={e => setShowCommentSubmit(false)}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button className="add-comment-btn" onClick={e => setShowCommentSubmit(true)}>
                    Add Comment
                </button>
            )}
            
        </div>
    );
}

Comments.propTypes = {
    slug: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired 
}