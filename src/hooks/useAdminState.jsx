import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "..";

export default function useAdminState(){
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if(!loading) {
            if (user == null) {
                setIsAdmin(false)
                return
            }
            user.getIdTokenResult().then((token) => {
                if (!!token.claims.admin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
        }
    }, [user, loading])

    return [isAdmin, loading || isAdmin === null];
}