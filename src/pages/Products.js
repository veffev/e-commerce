import { useEffect, useState } from "react";
import api from "../api/api";
import Product from "../components/Product";
import Container from "react-bootstrap/Container";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getProducts();
        setData(res.data.products);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1>Products</h1>
      {loading ? (
        "Loading"
      ) : data.length>0 ? (
        <Container fluid>
          {data.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </Container>
      ) : (
        <p>"Nessun prodotto trovato"</p>
      )}
    </>
  );
}
