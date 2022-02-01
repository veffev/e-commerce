import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "../assets/login.css";
import { LoginState } from "../context/ContextLogin";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {useState} from 'react'

export default function Login() {
  const {
    setUser
  } = LoginState();

  const[email,setEmail] =useState("")
  const[password,setPassword] = useState("")

  const navigate = useNavigate();

  return (
    <>
     
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-column "
        style={{ minHeight: "925px" }}
      >
         <h2>Login</h2>
        <Form
          style={{ width: "300px",paddingTop: "50px"}}
          onSubmit={async (e) => {
            console.log("sono form")
            e.preventDefault();
            try {
              const res=await api.loginEndPoint(email, password);
              setUser(res.data);
              navigate(`/`)
            } catch (error) {
              if (error.response) {
                console.warn(error.response.data);
              } else console.warn(error);
            }
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                console.log(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary" style={{ marginTop: "50px" }}>
            login
          </Button>
        </Form>
      </Container>
    </>
  );
}
