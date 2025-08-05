import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
