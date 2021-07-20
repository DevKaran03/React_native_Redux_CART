import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAction } from "../action/listAllproductAction";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToCartAction } from "../action/cartAction";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const Allproduct = useSelector((state) => state.Allproduct);
  const { loading, products, error } = Allproduct;

  const cartData = useSelector((state) => state.cartData);
  const { loading: load, cartItems, error: err } = cartData;

  const [flag, setFlag] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  // const [data, setData] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllProductAction());
    fn();
    //AsyncStorage.removeItem("cartData");
    //removeValue();
  }, [dispatch]);
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("cartData");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  const fn = async () => {
    await AsyncStorage.getItem("cartData").then((data) => {
      if (data != null) {
        const value = JSON.parse(data);
        console.log("====================================");
        console.log(value.length);
        console.log("====================================");
        dispatch(addToCartAction(value));
      }
    });
  };

  const addToCartHandler = (data) => {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    };
    AsyncStorage.getItem("cartData")
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);

          cart.push(itemcart);
          AsyncStorage.setItem("cartData", JSON.stringify(cart));
          dispatch(addToCartAction(cart));
        } else {
          const cart = [];

          cart.push(itemcart);
          AsyncStorage.setItem("cartData", JSON.stringify(cart));
          dispatch(addToCartAction(cart));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const flagHandler = () => {
    if (flag == false) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };
  const onChangeQua = (i, type) => {
    const dataCar = cartItems;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;

      AsyncStorage.setItem("cartData", JSON.stringify(dataCar));
      dispatch(addToCartAction(dataCar));
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;

      AsyncStorage.setItem("cartData", JSON.stringify(dataCar));
      dispatch(addToCartAction(dataCar));
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);

      AsyncStorage.setItem("cartData", JSON.stringify(dataCar));
      dispatch(addToCartAction(dataCar));
    }
  };
  return (
    <View style={{ margin: 30 }}>
      <ScrollView>
        <View style={{ alignItems: "center", alignSelf: "flex-end" }}>
          <View
            style={{
              borderRadius: 40,
              width: 22,
              height: 22,
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {load ? (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  //visibility of Overlay Loading Spinner
                  visible={load}
                  size="large"
                  color="#76c4d5"
                />
              </View>
            ) : (
              <Text style={{ color: "white" }}>{cartItems.length}</Text>
            )}
          </View>
          <MaterialIcons
            onPress={() => flagHandler()}
            style={{ marginBottom: 10 }}
            name="shopping-bag"
            size={30}
            color="pink"
          />
        </View>
        {loading ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              //visibility of Overlay Loading Spinner
              visible={loading}
              size="large"
              color="#76c4d5"
            />
          </View>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View>
            {products.map((item) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "pink",
                    margin: 10,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text>Name :</Text>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Categorie :</Text>
                    <Text>{item.type}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Price :</Text>
                    <Text>{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => addToCartHandler(item)}
                    style={{
                      backgroundColor: "green",
                      alignSelf: "flex-end",
                      padding: 5,
                      borderRadius: 8,
                      borderColor: "pink",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      ADD TO BAG
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        {flag ? (
          <View>
            <Text>CART ITEMS</Text>
            {load ? (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator
                  //visibility of Overlay Loading Spinner
                  visible={load}
                  size="large"
                  color="#76c4d5"
                />
              </View>
            ) : (
              <View>
                {cartItems.length !== 0 ? (
                  <View>
                    {cartItems.map((item, i) => {
                      return (
                        <ScrollView>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: "pink",
                              margin: 10,
                              padding: 10,
                              borderRadius: 8,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Text>Name :</Text>
                              <Text>{item.food.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text>Categorie :</Text>
                              <Text>{item.food.type}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text>Price :</Text>
                              <Text>${item.quantity * item.price}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text>Quantity :</Text>
                              <Text>{item.quantity}</Text>
                            </View>
                            <View
                              style={{
                                //+ - button view
                                borderRadius: 5,
                                flexDirection: "row",
                                padding: 5,
                                backgroundColor: "#EEDC00",
                                alignSelf: "center",
                                margin: 5,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => onChangeQua(i, false)}
                              >
                                <Icon
                                  name="ios-remove-circle"
                                  size={22}
                                  color={"black"}
                                />
                              </TouchableOpacity>
                              <Text
                                style={{
                                  alignItems: "center",

                                  fontWeight: "bold",
                                }}
                              >
                                {item.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() => onChangeQua(i, true)}
                              >
                                <Icon
                                  name="ios-add-circle"
                                  size={22}
                                  color={"black"}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ScrollView>
                      );
                    })}
                  </View>
                ) : (
                  <Text>Your Cart is empty !!</Text>
                )}
              </View>
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
