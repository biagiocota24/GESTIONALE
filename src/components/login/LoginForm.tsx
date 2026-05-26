import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = function () {
  return (
    <Container>
      <Row className="text-center mt-2">
        <h1>Hotel Casa Brunetti</h1>
      </Row>
      <Form as={Row} className="gap-2 justify-content-center">
        <Form.Group as={Col} lg={8}>
          <Form.Control type="email" placeholder="Email"></Form.Control>
          <Form.Control.Feedback>Email non valida !!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg={8}>
          <Form.Control type="password" placeholder="Password"></Form.Control>
          <Form.Control.Feedback>Password non valida !!</Form.Control.Feedback>
        </Form.Group>
        <Col lg={6} className="text-center">
          <Button>Accedi</Button>
        </Col>
      </Form>
      <Row className="text-center">
        <p>Oppure registrati <Link to={"registrationForm"}>qui</Link></p>
      </Row>
    </Container>
  );
};

export default LoginForm;
