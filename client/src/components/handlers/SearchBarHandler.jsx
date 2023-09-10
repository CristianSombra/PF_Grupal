import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchResults } from "../../redux/actions/index";
import { Form, Button, Row, Col } from 'react-bootstrap';

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
            />
          </Col>
          <Col xs="auto">
            <Button variant="dark" size="sm"  className="me-2" onClick={handleSearchSubmit}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBarHandler;
