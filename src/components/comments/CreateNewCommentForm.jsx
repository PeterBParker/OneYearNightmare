import CommentForm from "./CommentForm"
import { db } from "../../index";
import { auth } from "../../index";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import {PAGE_COMMENTS_TABLE} from "./utils/constants"

function CreateNewCommentForm(props) {
    const [content, setContent] = useState("");

    const createNewComment = async (e) => {
        let comment = {
          author_uid: auth.currentUser.uid,
          content: content,
          num_likes: 0,
          page_id: props.slug,
          parent_comment_id: props.parentId || null,
          time_created: Timestamp.fromDate(new Date()),
          liked_by_uids: null,
        };
        await addDoc(collection(db, PAGE_COMMENTS_TABLE), comment);
        setContent("");
        props.callback();
      };

    return (
        <CommentForm 
            onSubmitAction={createNewComment}
            slug={props.slug}
            parentId={props.parentId}
            content={content}
            setContent={(a) => setContent(a)}
        />
    );
}

export default CreateNewCommentForm;