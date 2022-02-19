import SupportMobile from './SupportMobile';
import SupportDesktop from './SupportDesktop';

import Pages from '../../comics/navigation/desktop/Pages';

import { useMediaQuery } from 'react-responsive';
import querySizes from '../../../styling/breakpoints.json';
import { useEffect } from 'react';

export default function Support(props) {
    const isTabletOrDesktop = useMediaQuery({query: querySizes['lg']});

    useEffect(() => {
        props.setMainPageState(Pages.SUPPORT);
    }, []);

    let patreonBody="Join the fun on our discord channel with a\
    monthly $1 contribution. Join the conversation\
    and conspiracy theories, meet fellow readers,\
    participate in polls for specials, and be first to\
    know for promotions, merch, etc."

    let buyusacoffeeBody="Enjoy reading and want to give a one-time\
    gift to help us keep going? Buy us a custard.\
    Or maybe a coffee. Or the bubbles for a\
    boba tea. Regardless, your contribution is\
    treasured!"

    return(
        isTabletOrDesktop ? <SupportDesktop patreonBody={patreonBody} buyusacoffeeBody={buyusacoffeeBody}/> : <SupportMobile patreonBody={patreonBody} buyusacoffeeBody={buyusacoffeeBody}/>
    );
}