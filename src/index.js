import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

// Sample AuthGuard and PrivateRoute components
const AuthGuardLayout = ({ children }) => {
  // Replace this with actual authentication logic
  const isAuthenticated = false; // Change as necessary for actual auth
  return isAuthenticated ? children : <SignIn />;
};

const PrivateRoute = ({ children }) => {
  // This route will be accessible to everyone (public routes)
  return children;
};

// Routing data
const routerData = [
  {
    id: 0,
    path: "/umbokdong/signin",
    label: "로그인",
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/umbokdong/signup",
    label: "회원가입",
    element: <SignUp />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/umbokdong/home",
    label: "로그인 후 지도 화면",
    element: <Home />,
    withAuth: false,
  },
  {
    id: -1,
    path: "/*",
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
