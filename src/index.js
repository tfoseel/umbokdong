import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

// Sample AuthGuard and PrivateRoute components
const AuthGuardLayout = ({ children }) => {
  const isAuthenticated = false; // Replace with actual authentication logic
  return isAuthenticated ? children : <SignIn />;
};

const PrivateRoute = ({ children }) => {
  return children;
};

// Routing data
const routerData = [
  {
    id: 0,
    path: "/signin",
    label: "로그인",
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/signup",
    label: "회원가입",
    element: <SignUp />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/home",
    label: "로그인 후 지도 화면",
    element: <Home />,
    withAuth: false,
  },
  {
    id: -1,
    path: "*",  // Catch-all route for unmatched paths
    label: "로그인",
    element: <SignIn />,
    withAuth: false,
  },
];

// Create Routes dynamically based on routerData
const AppRoutes = () => (
  <Routes>
    {routerData.map((router) => {
      if (router.withAuth) {
        return (
          <Route
            key={router.id}
            path={router.path}
            element={<AuthGuardLayout>{router.element}</AuthGuardLayout>}
          />
        );
      } else {
        return (
          <Route
            key={router.id}
            path={router.path}
            element={<PrivateRoute>{router.element}</PrivateRoute>}
          />
        );
      }
    })}
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
