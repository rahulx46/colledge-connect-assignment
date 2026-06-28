import { Navigate, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<TasksPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
