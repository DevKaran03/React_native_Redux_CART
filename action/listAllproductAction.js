import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "../constant_/cartConstants";

export const getAllProductAction = () => async (dispatch) => {
  const data = [
    { name: "Phone", type: "Electronics", price: 20000 },
    { name: "Tablet", type: "Electronics", price: 30000 },
    { name: "TV", type: "Electronics", price: 50000 },
  ];
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error,
    });
  }
};
