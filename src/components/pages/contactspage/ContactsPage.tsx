import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import ContactCard from "../../contactcard/ContactCard";
import { IContact } from "../../interfaces/ContactType";
import { Button } from "antd";
import SearchContactModal from "../../UI/searchcontactform/SearchContactModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../toolkit";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../toolkit/ToolkitSlice";
import classes from "./ContactsPage.module.css";
import AddContactModal from "../../UI/addcontactmodal/AddContactModal";
import addContactModal from "../../UI/addcontactmodal/AddContactModal";

const ContactsPage: FC = () => {
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

  const [contacts, setContacts] = useState<IContact[]>([]);
  const getContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/contacts`);
      setContacts(response.data);
    } catch {}
  };

  useEffect(() => {
    getContacts();
  }, [addContactModal]);
  return (
    <div>
      {isAuthUser ? (
        <>
          <div className={classes.search_add_container}>
            <AddContactModal setState={setContacts} />
            <SearchContactModal setState={setContacts} />
          </div>
          <div className={classes.card_container}>
            {contacts.map((contact) => (
              <ContactCard
                contact={contact}
                key={contact.id}
                fetchContact={getContacts}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={classes.redirect_container}>
          Вам нужно сначала залогиниться
          <Button type="primary" htmlType="submit" onClick={logOut}>
            Войти
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
