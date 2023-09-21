import React from "react";
import { motion } from "framer-motion";

import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.image} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>NGN {item.price}</td>
      <td>{item.quantity}px</td>
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
