import { CartState } from "../context/Context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../assets/cart.css";
import { useNavigate } from "react-router-dom";
import Counter from "../components/Counter";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, checkout, price } = CartState();

  // const total = cart.reduce((prev, current) => {
  //   return prev + current.quantity * current.price;
  // }, 0);

  return (
    <>
      <h1>My Cart</h1>
      <Container fluid className="container-products-cart">
        {cart.length >= 1 ? (
          cart.map((product) => (
            <>
              {" "}
              <Row>
                <Col className="col-cart " md style={{ alignItems: "center" }}>
                  {" "}
                  <img
                    alt="product"
                    style={{ width: "100px", height: "90px" }}
                    src="https://www.flmedical.com/wp-content/uploads/2016/12/img-vuota-300x221.jpg"
                    onClick={() => {
                      console.log("vado a pagina prodotto");
                    }}
                  />
                </Col>
                <Col
                  className=" col-cart "
                  style={{ justifyContent: "center" }}
                  md
                >
                  {" "}
                  <h4>{product.name}</h4>
                </Col>
                <Col className=" col-cart " md={7} style={{ padding: "0px" }}>
                  <Counter
                    available={product.available}
                    quantityProduct={product.quantity}
                    productId={product.id}
                    productAmount={product.price}
                  />
                </Col>
              </Row>
            </>
          ))
        ) : (
          <Row>
            <Col>
              <h3>your cart is empty</h3>
            </Col>
          </Row>
        )}
        {cart.length >= 1 ? (
          <>
            {" "}
            <Row>
              <Col className="col-cart justify-content-center">
                <h5>Total: {price}$ </h5>{" "}
              </Col>
            </Row>
            <Row>
              <Col className="col-cart align-items-center flex-row">
                <Button
                  variant="warning"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear my Cart
                </Button>
                {/* <Link to={`/checkout`}> */}
                <Button
                  variant="primary"
                  onClick={() => {
                    checkout();
                    navigate(`/checkout`, { state: { cart, price } });
                  }}
                >
                  Checkout
                </Button>
                {/* </Link> */}
              </Col>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default Cart;
