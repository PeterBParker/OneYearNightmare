import { useState, useEffect } from "react";
import { auth } from "../../..";
import { getAvatarUrl } from "../avatarHelpers";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePicture(props) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [user, loading, auth_error] = useAuthState(auth);

  useEffect(() => {
    let isMounted = true;
    async function updateAvatar() {
      // We haven't gotten this user's avatar url yet so let's do that now
      if (user) {
        let url = await getAvatarUrl(user.uid);
        if (isMounted) {
          setAvatarUrl(url);
        }
      }
    }
    if (props.avatarUrl && props.avatarUrl.length != 0) {
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
        className="bg-white rounded-full"
      />
    </div>
  );
}
