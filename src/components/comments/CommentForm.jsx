import PropTypes from "prop-types"
import { useState } from "react"
import {db} from "../../index";
import {collection, addDoc, Timestamp} from "firebase/firestore";

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
            num_likes: 0,
            page_id: props.slug,
            parent_comment_id: props.parentId || null,
            time_created: Timestamp.fromDate(new Date()),
            liked_by_uids: null
        }
        await addDoc(collection(db, "page_comments"), comment);
        setContent("");
        props.onSubmitAction();
    }

    return(
        <div className="comment-input-box">
            <form onSubmit={handleSubmit}>
                <div className="flex comment-input-elements py-2 w-full">
                    <div className="bg-eggshell py-2 px-2 basis-3/4 w-full">
                        <textarea
                            id="comment"
                            className="comment-content-input"
                            onChange={e => setContent(e.target.value)}
                            value={content}
                            name="comment-content-input"
                            required="required"
                            maxLength={500}
                        />
                    </div>
                    <button type="submit" className="submit-btn btn text-center px-4 py-2 basis-1/4 font-medium text-lg bg-cream-dark">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

CommentForm.propTypes = {
    slug: PropTypes.string.isRequired,
    parentId: PropTypes.string
}