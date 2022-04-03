import PropTypes from "prop-types"

import Comment from "./Comment"
import CommentForm from "./CommentForm"

/**
 * Renders supplied comment data.
 */
export default function Comments(props){
    return(
        <div className="comments-container">
            <div className="card-header">Tell us what you think!</div>
            <CommentForm slug={props.slug}/>
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
        </div>
    );
}

Comments.propTypes = {
    slug: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired 
}