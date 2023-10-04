import React from "react";
import { motion } from "framer-motion";

import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  const increaseProduct = () => {
    dispatch(cartActions.increaseItem(item.id));
  };

  const decreaseProduct = () => {
    dispatch(cartActions.decreaseItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.image} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>
        NGN{" "}
        {item.price.toLocaleString()}
      </td>
      <td>
        <div className="inline align-items-center gap-2">
          {item.quantity}pc
          <span>
            <div className="cart__button increment">
              <button onClick={increaseProduct}> + </button>
            </div>
            <div className="cart__button decrement">
              <button onClick={decreaseProduct}> - </button>
            </div>
          </span>
        </div>
      </td>
      <td>
        <motion.i
          className="ri-delete-bin-line"
          whileTap={{ scale: 1.1 }}
          onClick={deleteProduct}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Tr;
