import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const {
    logoutUser,
    loginUser,
    loginInfo,
    loginErr,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "8%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ color: "white" }}>Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
            <Button variant="success" color="success" type="submit">
              {isLoginLoading ? "Logging in" : "Login"}
            </Button>

            {loginErr?.error && (
              <Alert variant="danger">{loginErr?.message}</Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
}
