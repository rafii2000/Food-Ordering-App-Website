import React from 'react'

//contexts
import { UserOrderContextProvider } from './contexts/user_order';
import { RestaurantMenuContextProvider } from './contexts/restaurant_menu';
import { SearchContextProvider } from './contexts/search_bar';
import { UserContextProvider } from './contexts/user';

//init component
import AppLoader from './components/common/AppLoader';


import { setupAxiosInterceptors } from './utils/axiosInterceptors';

//styles
import './css/root.css'
import './css/buttons.css'
import './css/animations.css'


setupAxiosInterceptors()

function App() {
  
  return (
    
    <>
      
      <RestaurantMenuContextProvider >
      <UserOrderContextProvider>
      <SearchContextProvider>
      <UserContextProvider>
        
          <AppLoader/>

      </UserContextProvider>
      </SearchContextProvider>
      </UserOrderContextProvider>
      </RestaurantMenuContextProvider>
      
    </>
    
  );
}

export default App;
