import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (productInfo, quantity) => (dispatch, getState) => {

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            _id: productInfo._id,
            name: productInfo.name,
            image: productInfo.image,
            price: productInfo.price,
            countInStock: productInfo.countInStock,
            qty: quantity,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('length', JSON.stringify(getState().cart.length))
}

export const removeFromCart = productId => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            _id: productId,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('length', JSON.stringify(getState().cart.length))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
    
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}