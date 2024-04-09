import React from "react";
import { motion } from "framer-motion";
import { formatAmount } from "../../constants/helperFunction";

import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

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

  // const updateItemSize = (event) => {
  //   const newSize = event.target.value;
  //   // Dispatch an action to update the size in the cart
  //   dispatch(cartActions.updateItemSize({ itemId: item.id, newSize }));
  // };

  return (
    <tr>
      <td>
        <img src={item.image} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>
        {" "}
        {/* <input
          type="text"
          value={item.itemSize}
          onChange={updateItemSize}
          aria-label={`Update size of ${item.productName}`}
          style={{ width: "100px", textTransform: "uppercase" }}
        /> */}
        <p>{item.itemSize}</p>
      </td>
      <td>NGN {formatAmount(item.price)}</td>
      <td>
        <div className="inline align-items-center gap-2">
          {item.quantity}pc
          <span>
            <div className="cart__button increment">
              <button
                onClick={increaseProduct}
                aria-label={`Increase quantity of ${item.productName}`}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <div className="cart__button decrement">
              <button
                onClick={decreaseProduct}
                aria-label={`Decrease quantity of ${item.productName}`}
              >
                {" "}
                -{" "}
              </button>
            </div>
          </span>
        </div>
      </td>
      <td>
        <motion.i
          className="ri-delete-bin-line"
          whileTap={{ scale: 1.1 }}
          onClick={deleteProduct}
          aria-label={`Delete ${item.productName} from the cart`}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Tr;
