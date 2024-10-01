import React from "react"

import { useAuthState } from "react-firebase-hooks/auth"

import { Navigate } from "react-router-dom"

import { auth, SIGNIN_PAGE_PATH } from ".."
import AddFileForm from "../components/management/AddFileForm"
import { PageLoadingSpinner } from "../components/generic/loading/Spinners"
import { addRequiredFields } from "../api/ComicPageAPI"

export default function ContentManagement() {
    const [user, loading] = useAuthState(auth)


    if (loading) {
        return(<PageLoadingSpinner/>)
      }

    if (user === null) {
        return <Navigate to={SIGNIN_PAGE_PATH} />
    }

    // TODO Make this admin/creator only

    return (
        <React.Fragment>
            <div>Edit your content here if ye be an admin!</div>
            <div className="my-8 max-w-lg ml-auto mr-auto">
                <AddFileForm/>
            </div>
        </React.Fragment>
        
    )
}