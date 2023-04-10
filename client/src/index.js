import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StrictMode } from "react";
import ProductContextProvider from "./contexts/ProductContextProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ProductContextProvider>
);


