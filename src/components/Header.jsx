import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Headercss from "./Header.module.css";
function Header() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [role, setRole] = useState("");
  let logout = useLogout();

  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role);
    }
  }, []);
  return (
    <Navbar expand="lg " className={Headercss.totalbody}>
      <Container>
        <Navbar.Brand>
          {" "}
          <h3 className={Headercss.Logo}>APP</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items cursor-pointer">
            {role === "admin" ? <AdminNavLinks /> : <UserNavLinks />}
          </Nav>
          <Nav>
            <Nav.Item>
              <h4>{` ${userData.firstName} ${userData.lastName} `}</h4>
            </Nav.Item>
            &nbsp;
            <Nav.Item onClick={logout}>
              <Button variant="danger">Logout</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function AdminNavLinks() {
  let navigate = useNavigate();
  let logout = useLogout();
  return (
    <>
      <Nav.Item onClick={() => navigate("/dashboard")}>Dashboard</Nav.Item>
    </>
  );
}

function UserNavLinks() {
  let navigate = useNavigate();
  let logout = useLogout();
  return (
    <>
      <Nav.Item onClick={() => navigate("#")} className={Headercss.navitems}>
        Home
      </Nav.Item>
      <Nav.Item onClick={() => navigate("#")} className={Headercss.navitems}>
        Dashboard
      </Nav.Item>
      <Nav.Item onClick={() => navigate("#")} className={Headercss.navitems}>
        Create
      </Nav.Item>
    </>
  );
}

export default Header;
