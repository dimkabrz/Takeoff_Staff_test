import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IContact } from "../../interfaces/ContactType";
import { Button, Card, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import classes from "./ContactIdPage.module.css";

const ContactIdPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [contact, setContact] = useState<IContact | null>(null);

  const getPost = async () => {
    const response = await axios.get(
      `http://localhost:3001/contacts/${params.id}`
    );
    setContact(response.data);
  };
  const [visible, setVisible] = useState(false);

  const redactPost = async (values: { name: string; phone_number: number }) => {
    const response = await axios.put(
      `http://localhost:3001/contacts/${params.id}`,
      { ...contact, name: values.name, phone_number: values.phone_number }
    );
    setContact(response.data);
    setVisible(false);
  };
  useEffect(() => {
    getPost();
  }, []);

  if (!contact) {
    return null;
  }
  return (
    <div>
      <Card>
        <div className={classes.redact_form}>
          <div>Имя: {contact.name}</div>
          <div>Телефон: {contact.phone_number}</div>
          <Button
            onClick={() => setVisible(true)}
            className={classes.redact_btn}
          >
            Редактировать
          </Button>
          <Button onClick={() => navigate("/contacts")}>
            Вернуться к списку контактов
          </Button>
        </div>
        {visible ? (
          <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            initialValues={{
              name: contact.name,
              phone_number: contact.phone_number,
            }}
            onFinish={redactPost}
            autoComplete="off"
          >
            <Form.Item
              label="Имя контакта"
              name="name"
              rules={[{ required: true, message: "Напишите корректное имя!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Телефон"
              name="phone_number"
              rules={[{ required: true, message: "Укажите телефон!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Card>
    </div>
  );
};

export default ContactIdPage;
