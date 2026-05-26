import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import {
  MdBedroomParent,
  MdCalendarMonth,
  MdDashboard,
  MdPeople,
} from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
const links = [
  { to: "/", label: "Dashboard", icon: <MdDashboard size={18} /> },
  { to: "/rooms", label: "Rooms", icon: <MdBedroomParent size={18} /> },
  { to: "/guests", label: "Guests", icon: <MdPeople size={18} /> },
  {
    to: "/reservations",
    label: "Reservations",
    icon: <MdCalendarMonth size={18} />,
  },
  { to: "/login", label: "Login", icon: <MdPeople size={18} /> },
];

const Layout = function () {
  const location = useLocation();

  return (
    <Container fluid className="p-0">
      <div className="d-lg-none">
        <Navbar
          expand="lg"
          className="bg-dark position-relative"
          data-bs-theme="dark"
        >
          <Container fluid>
            <Navbar.Brand href="#home">
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="mobile-collapse">
              <Nav className="me-auto">
                {links.map((link) => {
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <NavDropdown title="Lo scopriremo" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
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
              {links.map((link) => {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={` p-2 ${location.pathname === link.to ? "link-attivo" : "link-inattivo"} d-flex gap-2 fs-5`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
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

export default Layout;
