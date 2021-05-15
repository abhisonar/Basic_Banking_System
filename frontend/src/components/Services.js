import React from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

function Services() {
    return (
      <div className="container my-4">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="images/image1.jpg" />
            <Card.Body>
              <Card.Title>Crypto Currency</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="images/image2.jpg" />
            <Card.Body>
              <Card.Title>Secure Netbaking</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
          
        </CardGroup>
      </div>
    );
}

export default Services
