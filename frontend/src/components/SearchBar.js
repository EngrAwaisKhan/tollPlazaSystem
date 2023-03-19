import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/api/record/${query}`);
    console.log(data);
  };
  return (
    <div>
      <Form className="d-flex" onSubmit={submitHandler}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}
