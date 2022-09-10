import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import { productDetailsState, productListState} from "../store";

export const productListReducer = (state = productListState, action) => {
  // lists out all the products from the DB
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
        error: "",
      };
      break;

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: "",
      };
      break;

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };

    default:
      return state;
  }
};


export const productDetailsReducer = (state = productDetailsState, action) => {
    // lists out all the products from the DB
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          productInfo: [],
          error: "",
        };
        break;

      case PRODUCT_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          productInfo: action.payload,
          error: "",
        };
        break;
        
      case PRODUCT_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          productInfo: [],
          error: action.payload,
        };
  
      default:
        return state;
    }
  };