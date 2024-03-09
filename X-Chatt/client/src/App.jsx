import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </Router>
  );
}

export default App;
