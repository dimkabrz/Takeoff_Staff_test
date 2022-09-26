import React, { FC } from "react";
import classes from "./Navbar.module.css";
import { Button } from "antd";
import { setAuth } from "../../toolkit/ToolkitSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../toolkit";
import classnames from "classnames/bind";

const cx = classnames.bind(classes);

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(setAuth(false));
    localStorage.removeItem("token");
    navigate("/");
  };
  const isAuthUser = useSelector(
    (state: RootState) => state.authorithation.isAuth
  );
  return (
    <div className={classes.navbar}>
      {isAuthUser ? (
        <Button
          type="primary"
          htmlType="submit"
          onClick={logOut}
          className={cx("myBtn")}
        >
          Выйти
        </Button>
      ) : null}
    </div>
  );
};

export default Navbar;
