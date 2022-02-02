import { CartState } from "../context/Context";
import Button from "react-bootstrap/Button";

export default function Quantity({ productId }) {
  const { updateCart } = CartState();
  return (
    <div style={{ padding: "15px", fontSize: "15px", paddingTop: "0px" }}>
      <Button
        variant="outline-dark"
        onClick={() => {
          updateCart(productId, "decr");
        }}
      >
        -
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => {
          updateCart(productId, "incr");
        }}
      >
        +
      </Button>
    </div>
  );
}
