import loadable from "@loadable/component";

import beTheFirst from "../../assets/Be_the_first.webp";
import { useMediaQuery } from "react-responsive";
import querySizes from "../../styling/breakpoints.json";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { SIGNIN_PAGE_PATH } from "../../index";
import { auth } from "../../index";
import useFirebaseAuth from "../users/hooks/useFirebaseAuth";
import { db } from "../../index";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { PAGE_COMMENTS_TABLE } from "./utils/constants";
import { useParams } from "react-router-dom/dist";
import { PARAM_PAGE_UUID } from "../../api/RefKeys";

const Title = loadable(() => import("../generic/Title"));
const LinkButton = loadable(() => import("../generic/LinkButton"));
const CreateNewCommentForm = loadable(() => import("./CreateNewCommentForm"));

/**
 * Renders supplied comment data.
 */
export default function Comments() {
  const params = useParams();
  const [showCommentSubmit, setShowCommentSubmit] = useState(false);
  const authUser = useFirebaseAuth(auth);
  const [comments, setComments] = useState([]);
  const isDesktop = useMediaQuery({ query: querySizes["lg"] });

  const page_uuid = params[PARAM_PAGE_UUID];

  useEffect(() => {
    const commentsQuery = query(
      collection(db, PAGE_COMMENTS_TABLE),
      where("page_id", "==", page_uuid),
      orderBy("time_created")
    );

    const unsub = onSnapshot(commentsQuery, (snapshot) => {
      let commentData = [];
      snapshot.forEach((doc) => {
        commentData.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentData);
    });
    return function cleanup() {
      unsub();
    };
  }, [page_uuid]);

  return (
    <div className={`${isDesktop ? "" : "bg-white"} comments-container h-full border-b border-mocha-dark lg:border-t-2 lg:border-r-2 lg:border-b-2 lg:border-l lg:pb-1 pb-4 flex flex-col justify-between`}>
      <div className="py-4 px-8 bg-eggshell text-left flex flex-row items-center comments-title">
        <Title text="Comments //" />
      </div>

      <div className="comment-list">
        {/* If there are comments, create a Comment component for each */}
        {comments.length > 0 ? (
          comments
            .filter((comment) => !comment.parent_comment_id)
            .map((comment) => {
              /* Get comments replying to it.*/
              let children;
              if (comment.id) {
                children = comments.filter(
                  (c) => comment.id === c.parent_comment_id
                );
              }
              return (
                <Comment
                  key={comment.id}
                  children={children}
                  comment={comment}
                  slug={page_uuid}
                />
              );
            })
        ) : (
          <img src={beTheFirst} width={414} className="ml-auto mr-auto" />
        )}
      </div>
      {authUser && authUser.displayName != null ? (
        showCommentSubmit ? (
          <div className="mx-4 my-4">
            <CreateNewCommentForm
              slug={page_uuid}
              callback={() => setShowCommentSubmit(false)}
            />
            <div
              className="cancel-comment-btn btn font-medium py-1 bg-eggshell btn-std-hover rounded-lg mt-2"
              onClick={(e) => setShowCommentSubmit(false)}
            >
              Cancel
            </div>
          </div>
        ) : (
          <div
            className="btn-std-hover my-4 py-2 mx-4 btn bg-eggshell font-medium"
            onClick={(e) => setShowCommentSubmit(true)}
          >
            Add Comment
          </div>
        )
      ) : (
        <LinkButton
          to={SIGNIN_PAGE_PATH}
          styles="btn-std-hover btn my-4 py-2 mx-4 btn  bg-cream-dark font-medium not-italic rounded"
          buttonContent="Log In"
        />
      )}
    </div>
  );
}
