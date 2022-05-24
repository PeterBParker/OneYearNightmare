import { useState, useEffect } from "react";

const useFirebaseAuth = (auth) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  }, []);

  return authUser;
};

export default useFirebaseAuth;
