import React from "react"

import { useAuthState } from "react-firebase-hooks/auth"

import { Navigate } from "react-router-dom"

import { auth, SIGNIN_PAGE_PATH, USER_PROFILE_PAGE_PATH } from ".."
import AddFileForm from "../components/management/AddFileForm"
import { PageLoadingSpinner } from "../components/generic/loading/Spinners"
import { useMediaQuery } from "react-responsive"
import querySizes from "../styling/breakpoints.json"
import useAdminState from "../hooks/useAdminState"

export default function ContentManagement() {
    const [user, loading] = useAuthState(auth)
    const isDesktop = useMediaQuery({query: querySizes["lg"]})
    const [isAdmin, adminLoading] = useAdminState();

    if (loading || adminLoading) {
        return(<PageLoadingSpinner/>)
    }

    if (user === null) {
        return <Navigate to={SIGNIN_PAGE_PATH} />
    }
    
    return (
        isAdmin ?
        <div className={`${isDesktop ? "" : "bg-cream-dark px-4"}`}>
            <div className="text-left text-xl font-header font-bold ml-2 my-4 ml-auto mr-auto max-w-lg">Page Management</div>
            <div className="my-8 max-w-lg ml-auto mr-auto">
                <AddFileForm/>
            </div>
        </div>
        :
        <Navigate to={USER_PROFILE_PAGE_PATH} />
    )
}