import React, { FC, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { IContact } from "../../interfaces/ContactType";
import axios from "axios";

interface SearchProps {
  setState: Function;
}

const AddContactModal: FC<SearchProps> = ({ setState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const getContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/contacts`);
      setState(response.data);
    } catch {}
  };

  const addNewContact = async (values: { name: string }) => {
    const response = await axios.post(`http://localhost:3001/contacts`, values);
    getContacts();
    onReset();
    handleCancel();
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Добавить контакт
      </Button>

      <Modal
        title="Введите данные для добавления"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={addNewContact}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Имя контакта"
            name="name"
            rules={[{ required: true, message: "Напишите корректное имя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phone_number"
            rules={[{ required: true, message: "Необходимо указать телефон" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddContactModal;
