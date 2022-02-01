import { CartState } from "../context/Context";
import Button from "react-bootstrap/Button";

export default function Quantity({quantity,productId,}) {
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
      <span>quantity: {quantity}</span>
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
