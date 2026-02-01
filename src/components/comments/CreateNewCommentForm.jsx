import CommentForm from "./CommentForm";
import { db } from "../../index";
import { auth } from "../../index";
import LinkButton from "../generic/LinkButton";
import {
  collection,
  addDoc,
  Timestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { useState } from "react";
import { PAGE_COMMENTS_TABLE } from "./utils/constants";
import { SIGNIN_PAGE_PATH } from "../../index";
import useCaptchaProtectedOperation from "../../hooks/useCaptchaProtectedOperation";

function CreateNewCommentForm(props) {
  const [content, setContent] = useState("");
  const { withCaptchaFallback } = useCaptchaProtectedOperation();

  const createNewComment = withCaptchaFallback(async (e) => {
    if (content.trim().length === 0) {
      throw new Error("Cannot create a comment with only whitespace");
    }
    let comment = {
      author_uid: auth.currentUser.uid,
      content: content.trim(),
      page_id: props.slug,
      num_likes: 0,
      parent_comment_id: props.parentId || null,
      time_created: Timestamp.fromDate(new Date()),
      liked_by_uids: null,
      has_children: false,
    };

    // If it has a parent, do a batch write
    if (props.parentId != null) {
      const batch = writeBatch(db);

      // Add comment to batch write
      const commentDocRef = doc(collection(db, PAGE_COMMENTS_TABLE));
      batch.set(commentDocRef, comment);

      // Update parent comment, so it knows it's a parent
      const parentCommentDocRef = doc(db, PAGE_COMMENTS_TABLE, props.parentId);
      batch.update(parentCommentDocRef, { has_children: true });

      await batch.commit();
    } else {
      await addDoc(collection(db, PAGE_COMMENTS_TABLE), comment);
    }
    setContent("");
    props.callback();
  });
  return (
    <>
      {auth.currentUser != null && auth.currentUser.displayName != null ? (
        <CommentForm
          onSubmitAction={createNewComment}
          slug={props.slug}
          parentId={props.parentId}
          content={content}
          setContent={(a) => setContent(a)}
        />
      ) : (
        <LinkButton
          to={SIGNIN_PAGE_PATH}
          styles=" btn bg-cream-dark px-4 py-2 my-1 w-full font-medium btn-std-hover text-center not-italic rounded"
          buttonContent="Log In"
        />
      )}
    </>
  );
}

export default CreateNewCommentForm;
