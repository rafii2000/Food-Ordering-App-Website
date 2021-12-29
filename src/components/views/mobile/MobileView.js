import React from 'react'

import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//mobile views - pages
import Home from './Home';
import Favorites from './Favorites';
import Account from './Account';


//mobile views - subpages
import Order from './Order';
import Cart from './Cart';
import LoginAndRegister from './LoginAndRegister';

//components
import OrderSummary from '../../common/Forms/OrderSummaryForm';
import OrderStatus from '../../common/OrderStatus';
import NotFound404 from '../../common/HttpErrors/NotFound404';


export default function MobileLayout() {
  
  return (
    
    <BrowserRouter>
      <Switch>

        {/* pages */}
        <Route exact path="/"><Redirect to="/home?dishType=burgers"/></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/account' component={Account}></Route>
        <Route path='/favorites' component={Favorites}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route path='/order-summary' component={OrderSummary}></Route>
        <Route path='/order-status' component={OrderStatus}></Route>
        
        {/* subpages */}
        <Route exact path='/login' component={LoginAndRegister}></Route>
        <Route exact path='/registration' component={LoginAndRegister}></Route>
        <Route exact path='/order' component={Order}></Route>

        {/* errors */}
        <Route path='/' component={NotFound404}></Route>
       
      </Switch>
    </BrowserRouter>
  
  );
}

