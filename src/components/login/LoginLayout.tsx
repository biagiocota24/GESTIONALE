import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const LoginLayout = function () {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-0">
      <div className="d-lg-none">
        <Navbar
          expand="lg"
          className="bg-dark d-flex flex-column gap-2"
          data-bs-theme="dark"
        >
          <Navbar.Brand href="#home" className="m-auto">
            <div
              className="bg-light rounded-5 p-2"
              style={{ maxWidth: "220px" }}
            >
              <img
                src="public/Design-ohne-Titel1.png"
                alt="logo"
                style={{ width: "100%" }}
              />
            </div>
          </Navbar.Brand>
          <div className="d-flex gap-3">
            <button
              type="button"
              style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                border: "1px solid white",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate("/registrationForm")}
            >
              Registrati
            </button>
            <button
              type="button"
              style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                border: "1px solid white",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Accedi
            </button>
          </div>
        </Navbar>
      </div>
      <Row className="g-0">
        <Col lg={3} className="d-none d-lg-block bg-dark min-vh-100">
          <aside className="py-3 text-white">
            <div
              className="bg-white p-2 rounded-5 m-auto"
              style={{ maxWidth: "250px" }}
            >
              <img
                src="public/Design-ohne-Titel1.png"
                alt="logo"
                className="w-100"
              />
            </div>
            <div className="d-flex flex-column gap-2 mt-5 px-3">
              <button
                type="button"
                style={{
                  padding: "7px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/registrationForm")}
              >
                Registrati
              </button>
              <button
                type="button"
                style={{
                  padding: "7px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Accedi
              </button>
            </div>
          </aside>
        </Col>
        <Col lg={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginLayout;
