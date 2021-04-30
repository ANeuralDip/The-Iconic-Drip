import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

function PopUp(){

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
      return(
        <Modal show={show} size="lg">
          <Modal.Header closeButton>
            <Modal.Title  id="modal-title">Subscribe to our newsletter</Modal.Title>
          </Modal.Header>
          <Modal.Body  id="modal">Subscribe to our newsletter for a 15% discount on your order
            <Form>
              <br/>
            <Form.Label  >Email address:</Form.Label>
                  <Form.Control id="form-input" type="email" placeholder="Enter email" />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button id="search-button" onClick={handleClose}>
              Close
            </Button>
            <Button id="search-button" onClick={handleClose}>
              Subscribe
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }

export default PopUp;
