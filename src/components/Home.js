import {Redirect} from 'react-router-dom';
import {COMIC_VIEWER_DEFAULT_PATH} from './Main';
import { useCookies } from 'react-cookie';

export default function Home() {
    return(
        <Redirect to={'/read'}/>
    );
}