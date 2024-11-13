import { useState, createContext } from "react";

export const CartContext = createContext({});

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function AddItemCart(newItem) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // Cria uma cópia do cart para evitar mutabilidade direta
      const cartList = [...cart];
      cartList[indexItem].amount += 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      TotalResultsCart(cartList);
      return;
    }

    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((prevCart) => {
      const updatedCart = [...prevCart, data];
      TotalResultsCart(updatedCart);
      return updatedCart;
    });
  }

  function RemoveItemCart(Item) {
    const indexItem = cart.findIndex((item) => item.id === Item.id);

    if (cart[indexItem]?.amount > 1) {
      const cartList = [...cart];
      cartList[indexItem].amount -= 1;
      cartList[indexItem].total -= cartList[indexItem].price;

      setCart(cartList);
      TotalResultsCart(cartList);
      return;
    }

    const updatedCart = cart.filter((item) => item.id !== Item.id);
    setCart(updatedCart);
    TotalResultsCart(updatedCart);
  }

  function TotalResultsCart(items) {
    const result = items.reduce((acc, obj) => acc + obj.total, 0);
    setTotal(result.toFixed(2));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        AddItemCart,
        RemoveItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
