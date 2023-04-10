import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [category, setCategory] = useState(localStorage.getItem("category"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // useEffect(() => {
  //   localStorage.setItem("category", category);
  // }, [category]);

  return (
    <ProductContext.Provider value={{ setUser, user }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
