import PropTypes from "prop-types"
import { useState } from "react"

/**
 * Provides a form for a user to submit a comment
 */
export default function CommentForm(props) {

    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async e => {
        e.preventDefault()
        let comment = {
            author_name: name,
            content: content,
            parent_comment_id: props.parentId || null,
            time: new Date(),
        }
        setName("")
        setContent("")
        console.log(comment)
    }

    return(
        <div className="comment-input-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input 
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="content">
                    Comment:
                    <textarea
                        id="comment"
                        onChange={e => setContent(e.target.value)}
                        value={content}
                        name="comment"
                        required="required"
                        cols="45"
                        rows="8"
                    />
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