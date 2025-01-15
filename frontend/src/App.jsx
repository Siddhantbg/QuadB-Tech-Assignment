import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RefrshHandler from './RefrshHandler';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const location = useLocation();  // To get the current path

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      
      {/* Layout Components - Only show on non-login/signup routes */}
      {!isAuthRoute && (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
          <Hero />
        </>
      )}

      {/* Routes */}
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Hero' element={<PrivateRoute element={<Hero />} />} />
      </Routes>
    </div>
  );
};

export default App;
