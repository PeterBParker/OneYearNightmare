import Header from '../header/Header';
import IconCard from '../generic/IconCard';

import patreonIcon from '../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';
import buyUsACoffeeIcon from '../../assets/Website Assets - Phase 1/SVG/FILLER-profile.svg';

export default function Support() {
    let patreonBody="Join the fun on our discord channel with a\
    montly $1 contribution. Join the conversation\
    and conspiracy theories, meet fellow readers,\
    participate in polls for specials, and be first to\
    know for promotions, merch, etc."

    let buyusacoffeeBody="Enjoy reading and want to give a one-time\
    gift to help us keep going? Buy us a coffee.\
    Or maybe half a taco. Or the bubbles for a\
    boba tea. Regardless, your contribution is\
    treasured!"

    return(
        <div className="supportPage">
            <Header defaultBg={true}/>
            <IconCard icon={patreonIcon} title="Patreon" body={patreonBody} link="https://www.patreon.com/" linkText="join the gang" />
            <IconCard icon={buyUsACoffeeIcon} title="Buy Us a Coffee" body={buyusacoffeeBody} link="https://www.buymeacoffee.com/rayell" linkText="feed us, pls" />
        </div>
    );
}