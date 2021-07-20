import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "../constant_/cartConstants";

export const list_all_product_reducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, state };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
