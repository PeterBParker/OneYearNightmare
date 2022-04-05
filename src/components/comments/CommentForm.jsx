import PropTypes from "prop-types"
import { useState } from "react"

/**
 * Provides a form for a user to submit a comment
 */
export default function CommentForm(props) {

    const [content, setContent] = useState("");

    const handleSubmit = async e => {
        e.preventDefault()
        let comment = {
            author_name: "name",
            content: content,
            parent_comment_id: props.parentId || null,
            time: new Date(),
        }
        setContent("")
        console.log(comment)
    }

    return(
        <div className="comment-input-box bg-eggshell mx-4 p-2">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment-content-input">
                    <textarea
                        id="comment"
                        onChange={e => setContent(e.target.value)}
                        value={content}
                        name="comment-content-input"
                        required="required"
                        cols="30"
                        rows="8"
                    >Write your comment here!</textarea>
                </label>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
}

CommentForm.propTypes = {
    slug: PropTypes.string.isRequired,
    parentId: PropTypes.string
}