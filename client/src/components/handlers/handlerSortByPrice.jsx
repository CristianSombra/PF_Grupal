import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProductsByPrice } from '../../redux/actions/index';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SortByPriceHandler = () => {
  const dispatch = useDispatch();
  const orderByPrice = useSelector((state) => state.orderByPrice);

  const handleSortChange = (newOrderByPrice) => {
    dispatch(sortProductsByPrice(newOrderByPrice === orderByPrice ? null : newOrderByPrice));
  };

  return (
    <div >
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ordenar por precio:</Form.Label>
          <DropdownButton variant = 'dark'
            title={orderByPrice === 'asc' ? 'Menor precio' : orderByPrice === 'desc' ? 'Mayor precio' : 'Sin selección'}
            onSelect={handleSortChange}
          >
            <Dropdown.Item eventKey="asc">Menor precio</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Mayor precio</Dropdown.Item>
          </DropdownButton>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SortByPriceHandler;
