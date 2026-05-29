import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";

const LoginForm = function () {

  
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const { guests, setCurrentUser } = useHotelStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    const user = guests.find(
      (g) => g.email === email && g.password === password,
    );
    if (!user) {
      setError("Credenziali non valide");
      return;
    }
    setCurrentUser(user);

    if (user?.role === "admin") navigate("/admin");
    else navigate(`/user/${user.id}`);
  };

  return (
    <Container>
      <Row className="text-center mt-2">
        <h1>Hotel Casa Brunetti</h1>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="gap-2 justify-content-center">
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Email non valida !!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Password non valida !!
            </Form.Control.Feedback>
          </Form.Group>
          {error && <p className="text-danger text-center mt-2">{error}</p>}
          <Col lg={6} className="text-center">
            <Button type="submit">Accedi</Button>
          </Col>
        </Row>
      </Form>
      <Row className="text-center">
        <p>
          Oppure registrati <Link to={"registrationForm"}>qui</Link>
        </p>
      </Row>
    </Container>
  );
};

export default LoginForm;
