import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { MdBedroomParent, MdPeople } from "react-icons/md";
import { Link, Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { useHotelStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import ConfirmModal, { type ModalType } from "../../components/Modal";

const LayoutUser = function () {
  const params = useParams();
  const navigate = useNavigate()
  const { setCurrentUser } = useHotelStore();
  const [modalType, setModalType] = useState<ModalType>(null);
  const isHome = useMatch("/user/:id")
  const isRooms = useMatch("/user/:id/rooms")
  const [expanded , setExpanded] = useState(false)

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(()=>{
    const handleClickOutside = ()=> setExpanded(false)
    document.addEventListener("click" , handleClickOutside)
    return()=> removeEventListener("click" , handleClickOutside)
  },[])

  return (
    <Container fluid className="p-0">
      <div className="d-lg-none">
        <Navbar
          expand="lg"
          expanded={expanded}
          onClick={(e)=> e.stopPropagation()}
          className="bg-dark position-relative"
          data-bs-theme="dark"
        >
          <Container fluid>
            <Navbar.Brand onClick={()=> navigate(`/user/${params.id}`)} style={{cursor:"pointer"}}>
              <div
                className="bg-light rounded-5 p-2"
                style={{ maxWidth: "220px" }}
              >
                <img
                  src="/Design-ohne-Titel1.png"
                  alt="logo"
                  style={{ width: "100%" }}
                />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=> setExpanded(prev => !prev)} />
            <Navbar.Collapse className="mobile-collapse">
              <Nav className="me-auto">
                <Link
                  to={`/user/${params.id}`}
                  className={` p-2 ${isHome ? "link-attivo" : "link-inattivo"} d-flex gap-2 fs-5`}
                  onClick={() => setExpanded(false)}
                >
                  <span>{<MdBedroomParent />}</span>
                  <span>Home</span>
                </Link>
                <Link
                  to="rooms"
                  className={` p-2 ${isRooms ? "link-attivo" : "link-inattivo"} d-flex gap-2 fs-5`}
                  onClick={() => setExpanded(false)}
                >
                  <span>{<MdBedroomParent />}</span>
                  <span>Rooms</span>
                </Link>
                <span
                  className={` p-2 d-flex gap-2 fs-5 link-inattivo`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setModalType("logout")}
                >
                  <span>{<MdPeople />}</span>
                  <span>Logout</span>
                </span>
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
              <img src="/Design-ohne-Titel1.png" alt="logo" className="w-100" />
            </div>
            <div className="d-flex flex-column gap-2 mt-5 px-3">
              <Link
                to={`/user/${params.id}`}
                className={` p-2 ${isHome ? "link-attivo" : "link-inattivo"} d-flex gap-2 fs-5`}
              >
                <span>{<MdBedroomParent />}</span>
                <span>Home</span>
              </Link>
              <Link
                to="rooms"
                className={` p-2 ${isRooms ? "link-attivo" : "link-inattivo"} d-flex gap-2 fs-5`}
              >
                <span>{<MdBedroomParent />}</span>
                <span>Rooms</span>
              </Link>
              <span
                className={` p-2 d-flex gap-2 fs-5 link-inattivo`}
                style={{ cursor: "pointer" }}
                onClick={() => setModalType("logout")}
              >
                <span>{<MdPeople />}</span>
                <span>Logout</span>
              </span>
            </div>
          </aside>
        </Col>
        <Col lg={9}>
          <Outlet />
        </Col>
      </Row>
      <ConfirmModal
        show={modalType === "logout"}
        title="Conferma logout"
        body="Sei sicuro di voler uscire?"
        confirmLabel="esci"
        onConfirm={logout}
        onClose={() => setModalType(null)}
      />
    </Container>
  );
};

export default LayoutUser;
