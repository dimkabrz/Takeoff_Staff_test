import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IContact } from "../interfaces/ContactType";
import { Button, Card } from "antd";
import axios from "axios";
import classes from "./ContactCard.module.css";

interface Contacts {
  contact: IContact;
  fetchContact: Function;
}

const ContactCard: FC<Contacts> = ({ contact, fetchContact }) => {
  const navigate = useNavigate();

  const navigateToPostIdPage = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/contacts/${contact.id}`);
  };

  const deletePost = async () => {
    const response = await axios.delete(
      `http://localhost:3001/contacts/${contact.id}`
    );
    fetchContact();
  };

  return (
    <Card className={classes.contact_card}>
      <div>Имя: {contact.name}</div>
      <div>Телефон: {contact.phone_number}</div>
      <Button onClick={navigateToPostIdPage} className={classes.redact_btn}>
        Редактировать
      </Button>
      <Button onClick={deletePost} className={classes.delete_btn}>
        Удалить
      </Button>
    </Card>
  );
};

export default ContactCard;
