import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Create() {
  const [numberplate, setNumberPlate] = useState('');
  const [entrypoint, setEntryPoint] = useState('');
  const [day, setDay] = useState('');
  // const [isValid, setIsValid] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/record/', {
      numberplate,
      entrypoint,
      day,
    });
    if ({ data }) {
      toast.success(
        `vehicle having number plate: ${numberplate} is entering from : ${entrypoint} on ${day}`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  const changeHandler = (e) => {
    // const value = e.target.value.toUpperCase();
    // setNumberPlate(value);
    // const reg = /^[A-Z]{3}-\[0-9]{3}$/;
    // if(!reg.test(value)){
    //   setIsValid(true);
    // }

    setNumberPlate(e.target.value);
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Entry Record</title>
      </Helmet>
      <Row>
        <Col></Col>
        <Col xs={6} style={{ marginTop: '2rem' }}>
          <h2>New Entry Record</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Vehicle Number Plate</Form.Label>
              <Form.Control
                value={numberplate}
                onChange={changeHandler}
                placeholder="Format: ABC-001"
                required
              />
              {/* {isValid && <p style={{ color: 'red' }}>Format is ABC-000</p>} */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Entry Point</Form.Label>
              <Form.Select
                onChange={(e) => setEntryPoint(e.target.value)}
                required
              >
                <option value="">Select Entry Point</option>
                <option value="Lahore">Lahore</option>
                <option value="Sheikhpura">Sheikhpura</option>
                <option value="Pindi Bhattian">Pindi Bhattian</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Day</Form.Label>
              <Form.Select onChange={(e) => setDay(e.target.value)} required>
                <option value={day}>Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="tuesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </Form.Select>
            </Form.Group>

            <div className="mb-6">
              <Button type="submit" variant="primary" size="md">
                Save
              </Button>
            </div>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
