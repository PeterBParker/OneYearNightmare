import React, { useRef } from "react"

export default function ImageInput({ fileUploadCallback }) {
    const fileInput = useRef(null);

    const onChange = async e => {
      if (e.target.files && e.target.files.length > 0) {
        fileUploadCallback(e.target.files[0])
      }
    }
    return ( 
        <div className="flex flex-col">
            <input 
                type='file'
                // className="hidden"
                ref={fileInput}
                name='image'
                className="mb-2"
                onChange={onChange}
                accept="image/png, image/jpeg, image/webp"
                multiple={false}
            />
        </div> 
    )
}