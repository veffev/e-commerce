import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const Cart = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const price = cart.reduce((prev, current) => {
    return prev +( current.quantity * current.price)
  }, 0);

  const addCart = async (product) => {
    const addProduct = cart.find((elem) => elem.id === product.id);
    if (addProduct) {
      updateCart(addProduct.id, "incr");
    } else {
      try {
        // await axios.post(`http://localhost:8080/addToCart/${product.id}`)
        await api.addToCart(product.id);
        // setCart(cart.concat(product))
        update();
      } catch (err) {
        if (err.response) {
          console.warn(err.response.data);
        } else console.warn(err);
      }
    }
  };

  const update = async () => {
    try {
      const res = await api.getCartEndPoint();
      // setCart((state)=>[...state, ...res.data.products])
      setCart(res.data.products);
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else console.warn(err);
    }
  };

  useEffect(() => {
    update();
  }, []);

  const updateQuantity = async (idProduct, count) => {
    const productUpddate = cart.find((product) => product.id === idProduct);
    try {
      await api.getUpdateCartEndPoint(idProduct, {
        quantity: (productUpddate.quantity = count),
      });
      update();
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else console.warn(err);
    }
  };

  const updateCart = async (idProduct, str) => {
    const productUpddate = cart.find((product) => product.id === idProduct);
    if (str === "incr") {
      // const updateCartIncr=cart.map((elem)=>{
      //   if(elem.id===idProduct)elem.quantity=elem.quantity+1
      //   return elem
      // })
      // setCart([...cart],updateCartIncr)
      try {
        setIsNotAvailable(false);
        await api.getUpdateCartEndPoint(idProduct, {
          quantity: productUpddate.quantity + 1,
        });
        update();
      } catch (err) {
        if (err.response) {
          console.warn(err.response.data);
        } else console.warn(err);
        setIsNotAvailable(true);
      }
    }
    if (str === "decr") {
      // const updateCartDecr=cart.map((elem)=>{
      //   if(elem.id===idProduct)elem.quantity=elem.quantity-1
      //   return elem
      // })
      // setCart([...cart],updateCartDecr)
      try {
        await api.getUpdateCartEndPoint(idProduct, {
          quantity: productUpddate.quantity - 1,
        });
        update();
      } catch (err) {
        if (err.response) {
          console.warn(err.response.data);
        } else console.warn(err);
      }
    }
    if (str === "clearId") {
      // const deleteCartId=cart.filter((product)=>{if(product.id!==idProduct) return product})
      // setCart(deleteCartId)
      // const deleteCartId=cart.map((product)=>{if(product.id!==idProduct){product.quantity=0} return product})

      // setCart([...cart],deleteCartId)
      try {
        await api.getUpdateCartEndPoint(idProduct, {
          quantity: (productUpddate.quantity = 0),
        });
        update();
      } catch (err) {
        if (err.response) {
          console.warn(err.response.data);
        } else console.warn(err);
      }
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.getEmptyCart();
      setCart([]);
      console.log("carrello svuotato", res.data);
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else console.warn(err);
    }
  };

  const checkout = async () => {
    try {
      const res = await api.getEmptyCart();
      console.log(res.data);
      setCart([]);
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else console.warn(err);
    }
  };

  return (
    <Cart.Provider
      value={{
        cart,
        addCart,
        updateCart,
        clearCart,
        checkout,
        updateQuantity,
        price,
        isNotAvailable,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  const context = useContext(Cart);
  if (context === undefined) {
    throw Error("Context deve essere usato dentro Cart.Provider");
  }
  return context;
};

export default Context;
