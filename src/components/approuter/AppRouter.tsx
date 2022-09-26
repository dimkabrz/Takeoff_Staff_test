import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginpage/LoginPage";
import ContactsPage from "../pages/contactspage/ContactsPage";
import ErrorPage from "../pages/errorpage/ErrorPage";
import ContactIdPage from "../pages/contactidpage/ContactIdPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/contacts/:id" element={<ContactIdPage />} />
    </Routes>
  );
};

export default AppRouter;
