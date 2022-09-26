import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../toolkit";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const isAuthUser = useSelector(
    (state: RootState) => state.authorithation.isAuth
  );

  return (
    <div className={classes.main_container}>
      <div>Данная страница не найдена</div>
      {isAuthUser ? (
        <Button type="primary" onClick={() => navigate("/contacts")}>
          Вернуться к списку контактов
        </Button>
      ) : (
        <Button type="primary" onClick={() => navigate("/")}>
          Перейти к странице входа
        </Button>
      )}
    </div>
  );
};

export default ErrorPage;
