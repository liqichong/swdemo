import React from 'react';
import { Link } from 'react-router-dom';

export default ({ page, count, prev, next }) => (
  <div className='text-center pt-3'>
    {prev && <Link to={`/${parseInt(page) - 1}`}>&lt;prev</Link>}
    <span className='ml-4 mr-4'>{page} / {Math.ceil(count / 10)}</span>
    {next && <Link to={`/${parseInt(page) + 1}`}>next&gt;</Link>}
  </div>
);
