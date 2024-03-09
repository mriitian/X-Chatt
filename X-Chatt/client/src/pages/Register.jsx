import React from "react";
import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerErr,
    isRegisterLoading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "8%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2 style={{ color: "white" }}>Register</h2>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  updateRegisterInfo({ ...registerInfo, name: e.target.value });
                }}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  });
                }}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  });
                }}
              />
              <Button variant="success" color="success" type="submit">
                {isRegisterLoading ? "Creating your Account" : "Register"}
              </Button>

              {registerErr?.error && (
                <Alert variant="danger">{registerErr?.message}</Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
