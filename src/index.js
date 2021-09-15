import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/AuthProvider";
import { WishlistProvider } from "./context/wishlist-context";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
