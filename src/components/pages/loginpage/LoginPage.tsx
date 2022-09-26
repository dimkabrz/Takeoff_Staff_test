import React, { FC, useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuth } from "../../toolkit/ToolkitSlice";
import { useDispatch } from "react-redux";
import classes from "./LoginPage.module.css";

interface FetchUsers {
  id: number;
  name: string;
  login: string;
  password: string;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.get(`http://localhost:3001/users`);
      const realUser = response.data.find((item: FetchUsers) => {
        return item.login === user.login;
      });
      if (realUser) {
        setLoginError("");
        if (realUser.password === user.password) {
          dispatch(setAuth(true));
          localStorage.setItem("token", user.login);
          navigate("/contacts");
        } else {
          setPasswordError("Пароль неверный");
        }
      } else {
        setLoginError("Логин неверный");
      }
    } catch {}
  };

  return (
    <div className={classes.main_container}>
      <form className={classes.login_form}>
        <Input
          placeholder="Введите логин"
          type="text"
          value={user.login}
          onChange={(e) => setUser({ ...user, login: e.target.value })}
          autoComplete="current-login"
        />
        <div>{loginError}</div>
        <Input
          placeholder="Введите пароль"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          autoComplete="current-password"
        />
        <div>{passwordError}</div>
        <Button onClick={login}>Войти</Button>
      </form>
    </div>
  );
};

export default LoginPage;
