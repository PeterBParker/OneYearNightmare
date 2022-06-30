import CommentForm from "./CommentForm"
import { db } from "../..";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {PAGE_COMMENTS_TABLE} from "./utils/constants"

function EditCommentForm(props) {
    const [content, setContent] = useState(props.initialContent ? props.initialContent : "");

    const editComment = async (e) => {
        const commentRef = doc(db, PAGE_COMMENTS_TABLE, props.comment.id);
        await updateDoc(commentRef, {
            content: content
        })
        props.callback();
      };

    return (
        <CommentForm onSubmitAction={editComment} slug={props.slug} content={content} setContent={(a) => setContent(a)}/>
    );
}

export default EditCommentForm;
