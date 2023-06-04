import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  localStorage.setItem("social", true);
  const [social, setSocial] = useState(localStorage.getItem("social"));

  // const [isConvert, setIsConvert] = useState(localStorage.getItem("isConvert"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("social", social);
  }, [social]);

  return (
    <ProductContext.Provider value={{ setUser, user, social, setSocial }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
