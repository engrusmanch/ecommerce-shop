import { Col, Container, Row } from "react-bootstrap";

export function Footer(){
    return (
        <footer className="bg-dark py-3">
          <Container>
            <Row>
              <Col md="6">
                <p className="text-muted">© Ecommerce Shop 2023</p>
              </Col>
              <Col md="6">
                <ul className="list-inline float-md-end">
                  <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                  <li className="list-inline-item"><a href="#">Terms of Use</a></li>
                  <li className="list-inline-item"><a href="#">Contact Us</a></li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      );
}