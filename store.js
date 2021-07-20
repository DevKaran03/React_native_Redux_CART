import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { list_all_product_reducer } from "./reducer/productReducer";
import { addToCartReducer, countReducer } from "./reducer/cartReducer";
import { setDATA } from "./action/cartAction";
const reducer = combineReducers({
  Allproduct: list_all_product_reducer,
  cartData: addToCartReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
