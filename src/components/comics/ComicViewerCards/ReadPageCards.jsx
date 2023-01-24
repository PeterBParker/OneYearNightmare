import DesktopReadPageCards from "./DesktopReadPageCards";
import MobileReadPageCards from "./MobileReadPageCards";
import ComicPageAPI from "../../../api/ComicPageAPI";
import { useEffect, useState } from "react";
import { db } from "../../../index";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { PAGE_COMMENTS_TABLE } from "../../comments/utils/constants";

export default function ReadPageCards(props) {
  const [comments, setComments] = useState([]);

  const page_uuid = props.page.uuid;

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

  return props.isDesktop ? (
    <DesktopReadPageCards
      page={props.page}
      chapter={props.chapter}
      page_uuid={page_uuid}
      comments={comments}
    />
  ) : (
    <MobileReadPageCards
      page={props.page}
      chapter={props.chapter}
      comments={comments}
      page_uuid={page_uuid}
    />
  );
}
