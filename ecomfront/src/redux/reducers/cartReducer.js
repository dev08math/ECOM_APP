import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, length: 0 }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:{
            const item = action.payload
            const index = state.cartItems.findIndex(p => p._id === item._id)
            const newCart = [...state.cartItems]
                if(index !== -1){
                    newCart[index].qty = item.qty
                    return {
                        ...state,
                        cartItems: newCart
                    }
                }
                else{
                    return {
                        ...state, 
                        cartItems: [...state.cartItems, item],
                        length: state.length + 1
                    }
                }
            }

            case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload._id),
                length: state.length - 1
            }
          
            
            case CART_SAVE_SHIPPING_ADDRESS:{
                return {
                    ...state,
                    shippingAddress: action.payload
                }
            }
         

            case CART_SAVE_PAYMENT_METHOD:{
                console.log("Cart state is ", state)
                return {
                    ...state,
                    paymentMethod: action.payload
                }
            }
        

            case CART_CLEAR_ITEMS:
                return {
                    cartItems: [],
                    length: 0,
                }
           

            default:
                return state;
            
        }
    }
