import ComicPageAPI from '../../api/ComicPageAPI';
import comic from '../../assets/comicPages/prologue/1.jpeg';
export default function ComicViewer(props) {
    console.log("Hello")
    // TODO Look into if additional sanitization is needed
    const pageInfo = ComicPageAPI.get(parseInt(props.match.params.pageNum), props.match.params.season);
    if(pageInfo == null) {
        return(
            <div>
                <p>No page found. :(</p>
            </div>
        )
    } 
    const pageFilePath = '../../assets/comicPages/' + pageInfo.season + '/' + pageInfo.filename;
    console.log(pageFilePath)
    // TODO Before deploying, implement these security measures: https://stackoverflow.com/questions/21110130/protect-image-download/21110248
    return(
        <div>
            <div>Hello</div>
            {/* TODO Figure out how to dynamically craft the url and then import the image*/}
            <img src={comic} alt="test" />
        </div>
        
    );
}