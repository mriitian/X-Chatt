import React from "react";
import { Button } from "react-bootstrap";

export default function CloseButton({ handleShow }) {
  return (
    <div>
      <Button variant="primary" className="d-lg-none" onClick={handleShow}>
        L
      </Button>
    </div>
  );
}
