import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Geekly Shop &copy; {currentYear}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
