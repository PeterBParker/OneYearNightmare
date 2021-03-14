import ComicPageAPI from '../../api/ComicPageAPI';

export default function MessageBox(props) {
    let messageData = ComicPageAPI.getMessageData(props.pageId);

    return(
        <div className="messageBoxWrapper">
            <div className="messageBoxTitle">
                {messageData.title}
            </div>
            <div className="messageBoxTime">
                {messageData.time}
            </div>
            <div className="messageBoxMessage">
                {messageData.message}
            </div>
        </div>
    );
}