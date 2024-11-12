# todo-app-mern

Fullstack React Todo Application built with Node.js, Express, MongoDB, and React. The application allows users to register, log in, and manage their personal todos. Each user can create, update, delete, and mark their todos as completed. Todos are stored in a MongoDB database and are associated with individual users to ensure that users only have access to their own todos.

The app also includes a JWT-based authentication system, where the backend verifies user identity using JSON Web Tokens (JWT) for secure API requests.

## ⚙️Tech Stack
- React.js
- Node.js
- Express
- MongoDB
- Typescript
- Javascript
- React Hook Form
- Zod
- Tailwind CSS
- JSON Web Token
- Axios
- Mongoose
- React Context API

## 🚀 Project Features

- **User Authentication**:
  - Users can register, log in, and receive a JWT token.
  - The JWT token is stored in the browser's local storage or authentication context and is included in requests to authenticate users.

- **Todo Management**:
  - Users can create, view, update, and delete their own todos.
  - Todos are stored with a reference to the user who created them, ensuring that each user only has access to their own todos.
  - Users can toggle the completion status of their todos.

- **Secure Routes**:
  - All todo-related routes are protected using JWT authentication middleware.
  - The backend verifies the user's token before processing requests, ensuring that only authenticated users can access their todos.

- **Responsive UI**:
  - The front end is built with **React**  and **Tailwind CSS** includes a responsive UI that adapts to both desktop and mobile devices.
 
## File Structure

- **Backend (Server-side)**:
  - `/config`: Contains MongoDB connection utility.
  - `/models`: Contains Mongoose models for the `User` and `Todo`.
  - `/controllers`: Contains logic for creating, reading, updating, and deleting todos.
  - `/routes`: Contains Express routes for the todo-related API endpoints.
  - `/middlewares`: Contains middleware for JWT authentication (`userAuth.js`).

- **Frontend (Client-side)**:
  - `/src/components`: Contains React components for displaying todos, login/register forms, etc.
  - `/src/context`: Contains React Context API for managing authentication state.
  - `/src/hooks`: Contains custom React hooks (e.g., `useAuth` for managing authentication).
  - `/src/utils`: Contains utility functions (e.g., for form validation).
  - `/src/types`: Contains reusable type definitions.

  ## API Endpoints

- **POST /api/users/register**: Registers a new user.
- **POST /api/users/login**: Logs in an existing user and returns a JWT token.
- **GET /api/todos**: Retrieves all todos for the authenticated user (requires token).
- **POST /api/todos**: Creates a new todo for the authenticated user (requires token).
- **PATCH /api/todos/update/:id**: Updates the text of an existing todo (requires token).
- **PATCH /api/todos/status/:id**: Toggles the completion status of a todo (requires token).
- **DELETE /api/todos/:id**: Deletes a todo (requires token).

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (cloud or local instance)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies for the backend:
```bash
   cd server
   npm install
```
3. Install dependencies for the frontend:
```bash
   cd client
   yarn
```
4. Setup env variables both on the frontend and backend

  - Create .env.local file with these variables for frontend
   ```bash
     VITE_SERVER_URL="your backend url"
  ```

- Create .env file with these variables for server
   ```bash
    MONGODB_CONNECTION_STRING= "your mongodb connection string"
    JWT_SECRET= ""
  ```
5. Start both the backend and frontend servers:
```bash
   cd server
   npm run dev
```
```bash
   cd client
   yarn dev
```
6. The react app should be available on http://locahost:5173/ and the server should be running on http://localhost:3000/





