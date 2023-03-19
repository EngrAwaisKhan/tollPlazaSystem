import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Create() {
  const navigate = useNavigate();
  const params = useParams();
  const { recordId } = params;

  const [numberplate, setNumberPlate] = useState('');
  const [entrypoint, setEntryPoint] = useState('');
  const [exitpoint, setExitPoint] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/record/${recordId}`);
      setNumberPlate(data.numberplate);
      setEntryPoint(data.entrypoint);
      if (data.exitpoint) {
        setExitPoint(data.exitpoint);
      }
      setDay(data.day);
    };
    fetchData();
  }, [recordId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { result } = await axios.put(`/api/record/${recordId}`, {
      numberplate,
      entrypoint,
      exitpoint,
      day,
    });
    if ({ result }) {
      toast.success(`Record has been updated.`);
      navigate('/show');
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Update Record</title>
      </Helmet>
      <Row>
        <Col></Col>
        <Col xs={6} style={{ marginTop: '2rem' }}>
          <h2>Update Record</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Vehicle Number</Form.Label>
              <Form.Control value={numberplate} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Entry Point</Form.Label>
              <Form.Control value={entrypoint} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exit Point</Form.Label>
              <Form.Select
                value={exitpoint}
                onChange={(e) => setExitPoint(e.target.value)}
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
              <Form.Control value={day} disabled />
            </Form.Group>

            <div className="mb-6">
              <Button type="submit" variant="primary" size="md">
                Update
              </Button>
            </div>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
