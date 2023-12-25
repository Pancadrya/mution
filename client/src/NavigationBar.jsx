import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function NavigationBar() {
  return (
    <Navbar className="bg-body-tertiary sticky-top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <i className="bi bi-boombox-fill fs-3 d-inline" />
          <p className="text-logo d-inline fw-bold ms-2">Mution</p>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
