import { useParams } from "react-router-dom";
import ClientGetApi from "../api/ClientGetApi";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginState } from "../context/ContextLogin";
import { CartState } from "../context/Context";
import Quantity from "../components/Quantity"

export default function SingleProduct() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const clientProduct = ClientGetApi();
  const { user } = LoginState();
  const { addCart } = CartState();
  const [showQuantity, setShowQuantity] = useState(false);

  const timeoutError = () => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  useEffect(() => {
    clientProduct.fetchProduct(id);
  });

  if (clientProduct.loading) {
    return (
      <Container fluid>
        <Row>
          <Col>
            Carico....
          </Col>
        </Row>
      </Container>
    );
  }

  if (clientProduct.error) {
    return (
      <Container fluid>
        <Row>
          <Col>Error: {clientProduct.error.message}</Col>
        </Row>
      </Container>
    );
  }

  if (!clientProduct.data || clientProduct.data.length === 0) {
    return (
      <Container fluid>
        <Row>
          <Col>Non ci sono info</Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <h1>Product</h1>
      <Container fluid className="container-product">
        <Container
          fluid
          className="container-product-info"
          style={{ padding: "20px", marginTop: "100px" }}
        >
          <Row>
            <Col>
              <img
              alt="product"
                style={{ width: "600px", height: "auto" }}
                src="https://www.flmedical.com/wp-content/uploads/2016/12/img-vuota-300x221.jpg"
              />
            </Col>
          </Row>
          <Row style={{ padding: "20px", marginTop: "20px" }}>
            <Col>
              <div>
                <h3>{clientProduct.data.name}</h3>
                <h5>Avaliable: {clientProduct.data.available}</h5>
                <h5>price: {clientProduct.data.price}$</h5>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid style={{ padding: "20px" }}>
          <Row>
            <Col>
            {showQuantity ? (
            <Quantity quantity={clientProduct.data.quantity} productId={clientProduct.data.id} />
          ) : null}
              <Button
                variant="primary"
                onClick={() => {
                  if (user) {
                    addCart(clientProduct.data);
                    setShowQuantity(true)
                  } else {
                    setError(true);
                    timeoutError();
                  }
                }}
              >
                Add to cart
              </Button>{" "}
              {error ? (
                <div
                  className="error-addToCart"
                  style={{ color: "red", padding: "10px" }}
                >
                  first you need login
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row style={{ height: "50px" }}>
            <Col />
          </Row>
          <Row style={{ padding: "20px", marginTop: "50px" }}>
            <Col className="d-flex justify-content-start">
              <Link to={`/products`} style={{ textDecoration: "none" }}>
                <Button variant="outline-dark">previous page</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
