import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchResults } from "../../redux/actions/index";
import { Form, Button, Row, Col } from 'react-bootstrap';
import searchIcon from '../../../node_modules/bootstrap-icons/icons/search.svg';

const SearchBarHandler = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(updateSearchResults(searchQuery));
    setSearchQuery("");
  };

  async function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      dispatch(updateSearchResults(searchQuery));
      setSearchQuery("");
    } else {
    }
  }


return (
  <div>
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control-sm"
            style={{ fontSize: '1.2rem' }}
            onKeyPress={handleEnterKeyPress}
          />
        </Col>
        <Col xs="auto">
          <Button variant="dark" size="sm" className="me-1" onClick={handleSearchSubmit}>
            <img
              src={searchIcon}
              alt="Buscar"
              style={{ filter: 'invert(1)', fill: 'white', width: '1.6rem' }}
            />
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
);
};

export default SearchBarHandler;
