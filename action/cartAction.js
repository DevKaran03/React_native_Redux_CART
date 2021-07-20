import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
} from "../constant_/cartConstants";

export const addToCartAction = (data) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART_REQUEST,
  });
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: data,
  });
  dispatch: ({
    type: ADD_TO_CART_FAIL,
    payload: "ERROR 404",
  });
};
