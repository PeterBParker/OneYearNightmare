export const ICON_WIDTH = 200
const ICON_HEIGHT = 300.75

/**
 * Takes a file and resizes it into an icon, gets the blob data, and returns the
 * canvas the icon was drawn with. 
 * @param {File} file 
 * @param {function} blobHandler - A function that is passed the blob data of the iconified image
 * @param {string} iconDisplayID - An optional div ID to paint the icon in
 * @returns the canvas the icon was drawn with
 */
export function iconifyFileIntoBlob(file, blobHandler = null, iconDisplayID = null) {
    const canvas = document.createElement("canvas");
    canvas.width = ICON_WIDTH;
    canvas.height = ICON_HEIGHT;
    const ctx = canvas.getContext("2d");
    var img = new Image();
    img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (iconDisplayID !== null) {
            displayIcon(canvas, iconDisplayID)
        }
        if (blobHandler !== null) {
            canvas.toBlob((dataBlob) => {blobHandler(dataBlob)})
        }
    })
    img.src = URL.createObjectURL(file) 
}

export function displayIcon(canvas, targetDivID) {
    const dataURI = canvas.toDataURL("image/webp");
    let testDisplay = document.getElementById(targetDivID)
    testDisplay.src = dataURI
}