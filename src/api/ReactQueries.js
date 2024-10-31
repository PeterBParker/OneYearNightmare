import { queryOptions } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./RefKeys";
import { getUserData } from "./ComicPageAPI";

export function authUserOptions(user) {
    return queryOptions({
        queryKey: [USER_QUERY_KEY, user.uid],
        queryFn: async () => {
            const data = await getUserData(user.uid)
            return data
        },
        enabled: !!user,
    })
}

export function userIDOptions(userID){
    return queryOptions({
        queryKey: [USER_QUERY_KEY, userID],
        queryFn: async () => {
            const data = await getUserData(userID)
            return data
        },
    })
}