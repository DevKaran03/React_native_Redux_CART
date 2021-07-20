import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
} from "../constant_/cartConstants";

export const addToCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };
    case ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload };
    case ADD_TO_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
