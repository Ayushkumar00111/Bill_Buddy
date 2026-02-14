import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddSubscription from "./pages/AddSubscription";
import MainLayout from "./layout/MainLayout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/add-subscription"
        
        element={
           <ProtectedRoute>
          
        <AddSubscription />
      
      </ProtectedRoute>
      } 
        
        />
 {/* PUBLIC PAGES (NO LAYOUT) */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
       <Route
          path="/dashboard"
          element={
             <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />

      
      </Routes>
     

    </BrowserRouter>
  );
}

