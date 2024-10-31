import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../..";
import { authUserOptions } from "../../../api/ReactQueries";
import { USER_URL } from "../../../api/RefKeys";


export default function ProfilePicture(props) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fetchedAvatar, setFetchedAvatar] = useState(false);
  const [user, loading, auth_error] = useAuthState(auth);
  const { isPending, isError, data, error} = useQuery(authUserOptions(user))
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function updateAvatar() {
      // Get the user's avatar ourself
      if (!isPending && !isError) {
        if (isMounted) {
          setAvatarUrl(data[USER_URL]);
          setFetchedAvatar(true);
        }
      }
    }

    // If we are receiving the avatar url, use that. Otherwise, get it ourselves.
    if (props.avatarUrl && props.avatarUrl.length !== 0) {
      setAvatarUrl(props.avatarUrl);
    } else {
      updateAvatar();
    }

    return () => (isMounted = false);
  }, [data, isError, isPending, props.avatarUrl]);

  return (
    <div className="mr-8">
      <img
        width={props.width}
        height={props.height}
        src={avatarUrl}
        alt=""
        style={{
          display:
            (props.fetchedAvatar && loaded) ||
            (props.fetchedAvatar == null && fetchedAvatar && loaded)
              ? "block"
              : "none",
          opacity: fetchedAvatar && loaded ? "100%" : "0%",
          animation: "fade-in 0.25s linear",
        }}
        className="bg-white rounded-full"
        onLoad={() => {
          setLoaded(true);
        }}
      />
      <div
        style={{
          display:
            (!props.fetchedAvatar || !loaded) &&
            (props.fetchedAvatar != null || !fetchedAvatar || !loaded)
              ? "block"
              : "none",
          width: props.width + "px",
          height: props.height + "px",
        }}
        className="loader"
      ></div>
    </div>
  );
}
