import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/approuter/AppRouter";
import { useDispatch } from "react-redux";
import { setAuth } from "./components/toolkit/ToolkitSlice";
import Navbar from "./components/UI/navbar/Navbar";

function App() {
  const loginSession = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginSession) {
      dispatch(setAuth(true));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
