import React from 'react';
import { Link } from 'react-router-dom';

export default ({ people, onClick }) => (
  <Link to={`/p/${people.id}`}>
    <li className='list-group-item list-group-item-action' onClick={onClick}>{people.name}</li>
  </Link>
);
