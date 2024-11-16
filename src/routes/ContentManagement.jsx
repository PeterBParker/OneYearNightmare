import React from "react"
import { useState } from "react"

import { useAuthState } from "react-firebase-hooks/auth"

import { Navigate } from "react-router-dom"

import { auth, SIGNIN_PAGE_PATH, USER_PROFILE_PAGE_PATH } from ".."
import AddFileForm from "../components/management/AddFileForm"
import UpdatePageForm from "../components/management/UpdatePageForm"
import { PageLoadingSpinner } from "../components/generic/loading/Spinners"
import { useMediaQuery } from "react-responsive"
import querySizes from "../styling/breakpoints.json"
import useAdminState from "../hooks/useAdminState"

export default function ContentManagement() {
    const AddPageAction = "Add Page";
    const UpdatePageAction = "Update Page";
    const ActionComponentMap = {
        [AddPageAction]: <AddFileForm/>,
        [UpdatePageAction]: <UpdatePageForm />,
    }
    const [user, loading] = useAuthState(auth)
    const [selectedAction, setSelectedAction] = useState(AddPageAction);
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
            <select onChange={(e) => {setSelectedAction(e.target.value)}}>
                {Object.keys(ActionComponentMap).map((key, index) => {return <option key={"pageActionKey"+index} value={key}>{key}</option>})}
            </select>
            <div className="my-8 max-w-lg ml-auto mr-auto">
                {ActionComponentMap[selectedAction]}
            </div>
        </div>
        :
        <Navigate to={USER_PROFILE_PAGE_PATH} />
    )
}