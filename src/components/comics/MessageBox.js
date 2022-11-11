import ComicPageAPI from '../../api/ComicPageAPI';

export default function MessageBox(props) {
    let pageData = ComicPageAPI.getPageContent(props.pageId);

    return(
        <div className="messageBoxWrapper">
            <div className="messageBoxTitle">
                {pageData.title}
            </div>
            <div className="messageBoxTime">
                {pageData.time}
            </div>
            <div className="messageBoxMessage">
                {pageData.message}
            </div>
        </div>
    );
}