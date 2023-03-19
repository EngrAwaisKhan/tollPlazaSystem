import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Create from './components/Create';
import Show from './components/Show';
import Update from './components/Update';
import Template404 from './components/Template404';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
// import SearchBar from './components/SearchBar';
// import { useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  // const location = useLocation();
  // const path = location.pathname;

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Toll Plaza System</Navbar.Brand>
          <Nav className="me-auto">
            <Button
              variant="light"
              onClick={() => navigate('/')}
              style={{ marginRight: '1rem' }}
            >
              New Entry
            </Button>{' '}
            <Button variant="light" onClick={() => navigate('/show')}>
              Show List
            </Button>
          </Nav>
          {/* {path === '/show' ? <SearchBar /> : ''} */}
        </Container>
      </Navbar>
      {/* toast notification */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/create" element={<Create />} />
        <Route path="/show" element={<Show />} />
        <Route path="/update/:recordId" element={<Update />} />
        {/* <Route path="*" element={<Template404 />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
