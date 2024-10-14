import React, { useRef } from "react"

export default function ImageInput({ setFile }) {
    const fileInput = useRef(null);

    const onChange = async e => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0])
      }
    }
    return ( 
        <React.Fragment>
            {/* <button className='btn-std-hover btn my-4 py-2 w-full text-lg bg-cream-dark font-medium not-italic rounded' onClick={() => fileInput.current.click()}>Choose File</button> */}
            <input 
                type='file'
                // className="hidden"
                ref={fileInput}
                name='image'
                onChange={onChange}
                accept="image/png, image/jpeg, image/webp"
                multiple={false}
            />
        </React.Fragment> 
    )
}