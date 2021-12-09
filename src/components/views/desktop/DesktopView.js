import React from 'react'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


//desktop views
import Home from './Home';
import Favorites from './Favorites';
import Account from './Account';
import LoginAndRegister from './LoginAndRegister';

//components
import OrderSummary from '../../common/Forms/OrderSummaryForm';
import NotFound404 from '../../common/HttpErrors/NotFound404';


export default function DesktopView() {
    return (
                    
        <BrowserRouter>
            <Switch>

                {/* pages */}
                <Route exact path="/"><Redirect to="/home?dishType=burgers"/></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/account' component={Account}></Route>
                <Route path='/favorites' component={Favorites}></Route>
                <Route path='/cart'><Redirect to="/home?dishType=burgers"/></Route>
                <Route path='/login' component={LoginAndRegister}></Route>
                <Route path='/registration' component={LoginAndRegister}></Route>
                <Route path='/order-summary' component={OrderSummary}></Route>

                {/* errors */}
                <Route path='/' component={NotFound404}></Route>
                    
            </Switch>
        </BrowserRouter>
        
    )
}
