
export default function CookieAgreementModal(props) {

    function agreeAndHide() {
        props.closeCookieModal();
    }

    function disableCookieAndHide() {
        // disable cookie state through function passed in on props
        props.disableCookies();
        // close modal
        props.closeCookieModal();
    }

    return (
        <div className="sideModal">
            <div className="sideModal">
            
            </div>
            <button onClick={() => {
                agreeAndHide()
            }}>
                Yes! I want to use the Bookie Mark!
            </button>
            <button onclick={() => {
                disableCookieAndHide()
            }}>
                No. I like losing my place in the book.
            </button>
        </div>
    );
}