import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [isConvert, setIsConvert] = useState(localStorage.getItem("isConvert"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // useEffect(() => {
  //   localStorage.setItem("isConvert", JSON.stringify(isConvert));
  // }, [isConvert]);

  return (
    <ProductContext.Provider value={{ setUser, user }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
