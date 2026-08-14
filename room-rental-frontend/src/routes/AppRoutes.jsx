import CreateRoom from "../pages/CreateRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Rooms from "../pages/Rooms";
import RoomDetail from "../pages/RoomDetail";
import MyBookings from "../pages/MyBookings";
import MyRooms from "../pages/MyRooms";
import ProtectedRoute from "../components/ProtectedRoute";
import OwnerBookings from "../pages/OwnerBookings";
import AdminDashboard from "../pages/AdminDashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route
    path="/rooms"
    element={<Rooms />}
/>
<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

<Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>

<Route
    path="/rooms/:id"
    element={<RoomDetail />}
/>
<Route
    path="/my-bookings"
    element={
      <ProtectedRoute requiredRole="tenant">
        <MyBookings />
      </ProtectedRoute>
    }
/>

<Route
    path="/my-rooms"
    element={
      <ProtectedRoute requiredRole="owner">
        <MyRooms />
      </ProtectedRoute>
    }
/>
<Route
    path="/create-room"
    element={
      <ProtectedRoute requiredRole="owner">
        <CreateRoom />
      </ProtectedRoute>
    }
/>
<Route
    path="/admin"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
/>
<Route
    path="/owner-bookings"
    element={
      <ProtectedRoute requiredRole="owner">
        <OwnerBookings />
      </ProtectedRoute>
    }
/>

                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;