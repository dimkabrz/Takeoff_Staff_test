import React, { ChangeEvent, FC, useState } from "react";
import { Input } from "antd";
import axios from "axios";
import classes from "./SearchContactModal.module.css";
import { SearchOutlined } from "@ant-design/icons";

interface SearchProps {
  setState: Function;
}

const SearchContactModal: FC<SearchProps> = ({ setState }) => {
  const [search, setSearch] = useState<string>("");

  const fetchSetter = async (searchText: string) => {
    const response = await axios.get(
      `http://localhost:3001/contacts?q=${searchText}`
    );
    setState(response.data);
  };

  const getContact = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearch(() => {
      fetchSetter(searchText);
      return searchText;
    });
  };

  return (
    <div className={classes.search_form}>
      <Input
        value={search}
        onChange={(e) => getContact(e)}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default SearchContactModal;
