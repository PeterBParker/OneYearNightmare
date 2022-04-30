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
                <div className="mx-4 my-4">
                    <CommentForm slug={props.slug} onSubmitAction={() => setShowCommentSubmit(false)}/>
                    <div className="cancel-comment-btn btn" onClick={e => setShowCommentSubmit(false)}>
                        Cancel
                    </div>
                </div>
            ) : (
                <div className="add-comment-btn my-4 py-2 mx-4 btn bg-eggshell font-medium" onClick={e => setShowCommentSubmit(true)}>
                    Add Comment
                </div>
            )}
            
        </div>
    );
}

Comments.propTypes = {
    slug: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired 
}