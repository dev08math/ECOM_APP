import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {logger} from 'redux-logger'

import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducer'

const middleware = [thunk, logger]

const userInitialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') ): {}

const cartItemsInitialState= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressInitialState= localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const itemsInCart = localStorage.getItem('length') ? JSON.parse(localStorage.getItem('length')) : 0

// console.log("userState ", userInitialState)

export const productListState = {
    loading: true,
    error: '',
    products: [],
}
export const productDetailsState = {
    loading: true,
    error: '',
    productInfo: [],
}


const initialState = {
    cart: {
        cartItems: cartItemsInitialState,
        shippingAddress: shippingAddressInitialState,
        length: itemsInCart
    },
    userLogin: { userInfo: userInitialState },
}
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,

    cart : cartReducer,

    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store