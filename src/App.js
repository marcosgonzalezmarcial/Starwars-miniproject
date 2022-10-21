import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import LoginForm from "./pages/Login/LoginForm/LoginForm";
import SignUpForm from "./pages/Login/SignUpForm/SignUpForm";
import SingleCharacter from "./components/SingleCharacter";
import Characters from "./pages/Characters";
import ErrorPage from "./pages/ErrorPage";
import StarShips from "./pages/StarShips";
import Header from "./components/Header";
import SingleShip from "./components/SingleShip";
import ProtectedRoute from "./pages/ProtectedRoute";
import NestedRoutes from "./pages/NestedRoutes";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [users, loggedIn]);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<NestedRoutes />}>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route path="home" element={<Home loggedIn={loggedIn} />} />
          <Route
            path="loginform"
            element={<LoginForm users={users} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="signupform"
            element={<SignUpForm setUsers={setUsers} />}
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="starships" element={<NestedRoutes />}>
              <Route index element={<StarShips />} />
              <Route path=":id" element={<SingleShip />} />
            </Route>
            <Route path="people" element={<NestedRoutes />}>
              <Route index element={<Characters />} />
              <Route path=":id" element={<SingleCharacter />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
