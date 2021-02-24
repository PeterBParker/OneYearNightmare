import {Switch, Route} from 'react-router-dom';
import ComicViewer from './comics/ComicViewer';
import Creators from './creators/Creators';
import Support from './creators/Support';

export default function Main() {
    return(
        <div>
            <Switch>
                <Route exact path='/' component={ComicViewer} />
                <Route path='/creatives' component={Creators} />
                <Route path='/support' component={Support} />
                <Route path='/read' component={ComicViewer} />
            </Switch>
        </div>
    );
}