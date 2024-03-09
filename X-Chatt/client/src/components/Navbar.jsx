import React from "react";
import { Nav, Container, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.5rem" }}>
      <Container>
        <p className="app-title">
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </p>
        {user && <span className="text-warning">{user?.name}</span>}

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => {
                    logoutUser();
                  }}
                  to={"/login"}
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to={"/login"} className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
