import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const contactos = [
  {
    nombre: 'Juan Pérez',
    puesto: 'Odontólogo',
    telefono: '(555) 123-4567',
    correo: 'juan.perez@dentalcompany.com'
  },
  {
    nombre: 'María Gómez',
    puesto: 'Asistente dental',
    telefono: '(555) 234-5678',
    correo: 'maria.gomez@dentalcompany.com'
  },
  {
    nombre: 'Luisa Hernández',
    puesto: 'Administradora',
    telefono: '(555) 345-6789',
    correo: 'luisa.hernandez@dentalcompany.com'
  }
];

const Contactos = () => {
  return (
    <Container className="mt-5">
      <h2>SHADDAI IMPORT</h2>
      <Row className="mt-3">
        {contactos.map((contacto, index) => (
          <Col key={index} xs={12} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{contacto.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{contacto.puesto}</Card.Subtitle>
                <Card.Text>
                  Teléfono: {contacto.telefono}
                  <br />
                  Correo: {contacto.correo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Contactos;
