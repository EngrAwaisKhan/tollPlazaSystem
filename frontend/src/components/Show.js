import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';


export default function Show() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const items = [];
  for (let number = 0; number < totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {1 + number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/record?page=${page}`);
      setRecords(data.allRecord);
      setTotalPages(data.countRecord);
    };
    fetchData();
  }, [page]);

  const deleteHandler = async (record) => {
    if (window.confirm('Are you sure to delete it?')) {
      try {
        await axios
          .delete(`/api/record/${record._id}`)
          .then(() => {
            setRecords(
              records.filter((r) => {
                return r._id !== record._id;
              })
            );
          })
          .then(toast.success('Record delete successfully!'));
      } catch (err) {
        toast.err(err);
      }
    }
  };

  return (
    <Container className="small-container">
      <div>
        <Helmet>
          <title>Show All Record</title>
        </Helmet>
        <Row>
          <Col></Col>
          <Col xs={8} style={{ marginTop: '2rem' }}>
            <h2>Show All Record</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Number Plate</th>
                  <th>Entry Point</th>
                  <th>Exit Point</th>
                  <th>Day</th>
                  <th>Total Charges</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, ind) => (
                  <tr key={record._id}>
                    <td>{++ind}</td>
                    <td>{record.numberplate}</td>
                    <td>{record.entrypoint}</td>
                    <td>{record.exitpoint}</td>
                    <td>{record.day}</td>
                    <td>{record.totalCharges}</td>
                    <td>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => navigate(`/update/${record._id}`)}
                      >
                        Update
                      </Button>
                      &nbsp;
                      <Button
                        type="button"
                        variant="warning"
                        onClick={() => deleteHandler(record)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <Pagination>{items}</Pagination>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
}
