import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";
import { admins } from "../../data/mockData";

const LoginAdminForm = function () {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentAdmin } = useHotelStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    const admin = admins.find(
      (admin) => admin.email === email && admin.password === password,
    );
    if (!admin) {
      setError("Credenziali non valide");
      return;
    }
    setCurrentAdmin(admin)
    
    navigate(`/admin/${admin.id}`)

  };

  return (
    <Container>
        <h1>login amministratore</h1>
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
    </Container>
  );
};

export default LoginAdminForm;
