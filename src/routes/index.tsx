import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Home } from "@/page/Home";
import Login from "@/page/Login/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
