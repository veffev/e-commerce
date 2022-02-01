import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const src =
    "https://www.nextre.it/wp-content/uploads/2018/04/ecommercedata.jpg";

  const style = {
    minHeight: "952px",
    width: "100%",
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
  };

  return (
    <div
      style={style}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "952px",
          background:
            "radial-gradient(circle, rgba(6,6,3,0.5130427170868348) 0%, rgba(0,0,0,0.10688025210084029) 100%)",
        }}
      ></div>

      <Button
        variant="warning"
        size="lg"
        onClick={() => navigate("/products")}
        style={{ zIndex: "1", fontWeight: "bold", fontSize: "25px" }}
      >
        Products
      </Button>
    </div>
  );
};

export default Home;
