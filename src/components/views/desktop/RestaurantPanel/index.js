import React from 'react'
import useRestaurantPanel from './logic'

import './style.css'

export default function RestaurantPanel() {
    
    const {orders, acceptOrder, rejectOrder, formatDate, getDishesFromOrder, getDishAmountAndSizes} = useRestaurantPanel()
    
    return (

        <div className='restaurant-panel'>

            {orders && 
            <>

            <div className='restaurant-panel__header'>
                <h1>RestaurantPanel</h1>
                <p>Total orders: {orders.length}</p>
            </div>
            



            <div className='restaurant-panel__orders-list'>
                {orders.map((order, id) => 
                    
                    <div className='order' key={id}>
                       
                        <div className='order__top'>

                            <p>Time: {formatDate(order.date)}</p>
                            <p>Order ID: {order.orderID}</p>
                            


                        
                        </div>

                        {getDishesFromOrder(order).map((dish, id) => 
                           
                            <div className='order__dish' key={id}>
                                
                                <img src={process.env.PUBLIC_URL+`${dish.dishDTO.photos[0]}${dish.dishDTO.dishType}/${dish.dishDTO.dishID}/photo.png`} alt='food'></img>
                                <div className='order__dish__name'>{dish.dishDTO.name}</div>

                                {getDishAmountAndSizes(dish).map(([dishSize, amount]) =>
                                    
                                    <div className='order__dish__size'>
                                        {`${dishSize}x${amount}`}
                                    </div>
                                )}
                            </div>
                            
                        )}

                        <div className='order__bottom'>
                            <button action='accept' onClick={() => acceptOrder(order.orderID)}>Accept</button>
                            <button action='reject' onClick={() => rejectOrder(order.orderID)}>Reject</button>
                        </div>
                        
                    </div>
                )}
            </div>
            
            </>
            }

        </div>
    )
}
