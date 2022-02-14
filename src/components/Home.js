import {Redirect} from 'react-router-dom';
import { COMIC_VIEWER_PATH } from './Main';

export default function Home() {
    return(
        <Redirect to={COMIC_VIEWER_PATH}/>
    );
}