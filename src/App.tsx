import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Flip, ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer transition={Flip} />
    </div>
  );
}

export default App;
