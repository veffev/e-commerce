import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: "925px" }}
    >
      <Row>
        <Col>
          <h1>Thanks for your purchase !</h1>
          <h3 style={{ marginTop: "50px" }}>Your Order:</h3>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
            }}
          >
            {state?.cart.map((elem, index) => (
              <li key={index} style={{ borderBottom: "1px solid grey" }}>
                <h4>{elem.name}</h4>
                <h5>Quantity: {elem.quantity}</h5>
                <h5>Price: {elem.quantity * elem.price}$</h5>
              </li>
            ))}
          </ul>
          <h4 style={{ marginTop: "20px" }}>total:{state?.price}$</h4>
          <Button
            variant="primary"
            onClick={() => navigate(`/`)}
            style={{ marginTop: "10px" }}
          >
            Go to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
