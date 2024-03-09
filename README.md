# Chat Application README

Welcome to our Chat Application repository! This application allows users to engage in real-time messaging through a MERN stack architecture using MongoDB Atlas for database management. The application is divided into three main folders: `server`, `socket`, and `client`, each serving distinct functionalities.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository:**


2. **Server Setup:**

- Navigate to the `server` directory:

  ```
  cd server
  ```

- Install dependencies:

  ```
  npm install
  ```

- Start the server:

  ```
  npm start
  ```

3. **Socket Setup:**

- Navigate to the `socket` directory:

  ```
  cd socket
  ```

- Install dependencies:

  ```
  npm install
  ```

- Start the socket server:

  ```
  npm start
  ```

4. **Client Setup:**

- Navigate to the `client` directory:

  ```
  cd client
  ```

- Install dependencies:

  ```
  npm install
  ```

- Run the client:

  ```
  npm run dev
  ```

## Folder Structure

- **`server`**: Contains the backend logic and API endpoints for the application.
- **`socket`**: Manages the WebSocket connection for real-time messaging functionality.
- **`client`**: Houses the frontend components and user interface of the application.

## Features

- User Authentication: Users can register, login, and logout securely.
- Real-time Messaging: Engage in real-time conversations with other users.
- User, Message, and Chat Models: Organize data efficiently with clear models.

## Technologies Used

- **MERN Stack**:
- MongoDB Atlas: Cloud-hosted MongoDB database service.
- Express.js: Backend framework for Node.js.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for server-side programming.
- **WebSocket**:
- Enables real-time communication between clients and server.
- **npm**:
- Package manager for Node.js and JavaScript libraries.

## Contributing

We welcome contributions from the community to enhance the features and functionality of the Chat Application. If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

