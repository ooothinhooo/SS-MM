import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [social, setSocial] = useState(Boolean(true));

  // const [isConvert, setIsConvert] = useState(localStorage.getItem("isConvert"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    console.log(social);

    // setSocial(!social);
  }, [social]);

  return (
    <ProductContext.Provider value={{ setUser, user, social, setSocial }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
