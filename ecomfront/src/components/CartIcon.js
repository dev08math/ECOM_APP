import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function CartIcon() {
  const length = useSelector(state => state.cart.length)
  return (
    <div>
      <i className="fas fa-shopping-cart">  {length}</i>
    </div>
  );
}
