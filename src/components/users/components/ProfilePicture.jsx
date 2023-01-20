import { useState, useEffect } from "react";
import { auth } from "../../..";
import { getAvatarUrl } from "../avatarHelpers";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePicture(props) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fetchedAvatar, setFetchedAvatar] = useState(false);
  const [user, loading, auth_error] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function updateAvatar() {
      // Get the user's avatar ourself
      if (user) {
        let url = await getAvatarUrl(user.uid);
        if (isMounted) {
          setAvatarUrl(url);
          setFetchedAvatar(true);
        }
      }
    }

    // If we are receiving the avatar url, use that. Otherwise, get it ourselves.
    if (props.avatarUrl && props.avatarUrl.length != 0) {
      setLoaded(false);
      setAvatarUrl(props.avatarUrl);
    } else {
      updateAvatar();
    }

    return () => (isMounted = false);
  }, [user.displayName, props.avatarUrl]);

  return (
    <div className="mr-8">
      <img
        width={props.width}
        height={props.height}
        src={avatarUrl}
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
