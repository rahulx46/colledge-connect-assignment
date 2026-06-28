# Task Tracker

A full-stack Task Tracker application built using the MERN stack. The application allows users to create, update, delete, search, filter, and manage tasks through a clean and responsive interface.

## Features

- Create, edit, and delete tasks
- View all tasks
- Search tasks by title
- Filter tasks by status and priority
- Sort tasks by date or title
- Responsive design
- Dark mode
- Form validation
- Toast notifications

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Project Structure

```text
task-tracker/
├── client/
├── server/
├── README.md
└── .env.example
```

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd task-tracker
```

### Install dependencies

```bash
npm run install:all
```

Or install them separately:

```bash
cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Project

Start the backend:

```bash
npm run dev:server
```

Start the frontend:

```bash
npm run dev:client
```

Open the application in your browser:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

Built as part of a Full Stack Developer internship assessment.
