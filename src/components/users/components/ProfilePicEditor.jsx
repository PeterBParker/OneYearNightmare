import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../..";
import { generateAvatarData, storeUserAvatar } from "../avatarHelpers";
import ProfilePicture from "./ProfilePicture";
import { updateUserData } from "../../../api/ComicPageAPI";
import { USER_URL } from "../../../api/RefKeys";
import useCaptchaProtectedOperation from "../../../hooks/useCaptchaProtectedOperation";

export default function ProfilePicEditor() {
    const [user] = useAuthState(auth);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatarSeed, setAvatarSeed] = useState("");
    const [avatarSaved, setAvatarSaved] = useState(true);
    const { withCaptchaFallback } = useCaptchaProtectedOperation();
    const mutation = useMutation({
      mutationFn: withCaptchaFallback(async (avatarData) => {
        const url = await storeUserAvatar(user.uid, avatarData);
        return updateUserData(user.uid, {[USER_URL]: url})
      }),
    });
  
    const changeAvatar = () => {
      let newSeed = uuidv4();
      setAvatarSeed(newSeed);
      setAvatarUrl(`https://api.dicebear.com/8.x/lorelei/svg?seed=${newSeed}`);
    };

    return(
        <div className="flex flex-wrap flex-col">
            <ProfilePicture
              width="200"
              height="200"
              avatarUrl={avatarUrl}
            />
            <div className="flex flex-wrap flex-row mt-4 mr-8 justify-evenly">
              <div
                className="btn btn-std-hover bg-white px-4 py-2 avatarModBtn"
                onClick={changeAvatar}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </div>
              <div
                className="btn btn-std-hover bg-green-confirm px-4 py-2 font-medium avatarModBtn"
                onClick={async () => {
                  setAvatarSaved(false);
                  const avatarData = generateAvatarData(avatarSeed)
                  await mutation.mutateAsync(avatarData);
                  setAvatarSaved(true);
                }}
              >
                {avatarSaved ? (
                  "Save"
                ) : (
                  <div
                    className="loader"
                    style={{ width: 28, height: 28 }}
                  ></div>
                )}
              </div>
            </div>
          </div>
    )
}