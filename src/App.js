import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import { LoginState } from "./context/ContextLogin";

import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Routes>
            {/* <Route path="/"  element={ log ? <Home/>: <Login/> } /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/cart"
              element={
                <PrivateRoutes>
                  {" "}
                  <Cart />{" "}
                </PrivateRoutes>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoutes>
                  {" "}
                  <Checkout />{" "}
                </PrivateRoutes>
              }
            />
            <Route path="/product/:id" exact element={<SingleProduct />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

const PrivateRoutes = ({ children }) => {
  const { user } = LoginState();

  return <>{user ? children : <Navigate to={"/"} />}</>;
};
