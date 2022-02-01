import { Navbar, Container, Nav } from "react-bootstrap";
import { CartState } from "../context/Context";
import { LoginState } from "../context/ContextLogin";
import {Link} from 'react-router-dom'
import '../App.css'

export default function NavBar() {
  const { user ,setUser} = LoginState();
  const { cart } = CartState();

  const total = cart.reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);

  return (
    <Navbar bg="light" expand="md" style={{borderBottom: "1px solid grey"}}>
      <Container>
      <Nav.Link as="span"> <Link className="style-link" to="/">Home</Link></Nav.Link>
        <Nav className="me-auto">
          <Nav.Link as="span"><Link className="style-link" to="/products">Products</Link></Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? <Link className="style-link" to="/cart">Cart {total} </Link> : null}
          {user ? (
            <>
             <Navbar.Text>
            Signed in as: {user.name}
          </Navbar.Text>
            <Navbar.Text style={{cursor: 'pointer'}} onClick={()=>setUser(null)} >Logout</Navbar.Text>
           
            </>
          ) : (
            <Nav.Link as="span"> <Link className="style-link" to="/login">Login</Link></Nav.Link>
          )}
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
