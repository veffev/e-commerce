import { CartState } from "../context/Context";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assets/product.css";
import { Link } from "react-router-dom";
import { LoginState } from "../context/ContextLogin";
import { useState } from "react";

export default function Product({ key, product }) {
  
  const { addCart, isNotAvailable } = CartState();
  const { user } = LoginState();
  const [error, setError] = useState(false);
  const timeoutError = () => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  return (
    <Row className="product">
      <Col className="d-flex justify-content-center">
        <div className="product-card">
          <Link to={`/product/${product.id}`}>
            <img
              alt="Product"
              style={{ width: "300px", height: "auto" }}
              src="https://www.flmedical.com/wp-content/uploads/2016/12/img-vuota-300x221.jpg"
            />
          </Link>

          <div className="product-card-info">
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <h3>{product.name}</h3>
            </Link>
            <h4>{product.price}$</h4>
          </div>
          <Button
            style={{ marginTop: "10px" }}
            variant="primary"
            onClick={() => {
              if (user) {
                addCart(product);
              } else {
                setError(true);
                timeoutError();
              }
            }}
          >
            Add to Cart
          </Button>
          {error ? (
            <div
              className="error-addToCart"
              style={{ color: "red", padding: "10px" }}
            >
              <h6>first you need login</h6>
            </div>
          ) : null}
          {key === product.id && isNotAvailable ? (
            <div
              className="error-addToCart"
              style={{ color: "red", padding: "10px" }}
            >
              <h6>max quantity reached</h6>
            </div>
          ) : null}
        </div>
      </Col>
    </Row>
  );
}
