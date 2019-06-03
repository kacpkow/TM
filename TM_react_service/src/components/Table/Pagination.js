import React from 'react';
import Button from '../Button';

const Pagination = ({ totalPages, page, onChange }) => (
  <ul className="paginate">
    {Array(totalPages)
      .fill()
      .map((_, key) => (
        <li className="paginate__item">
          <Button isActive={page === key} onClick={() => onChange(key)}>
            {key + 1}
          </Button>
        </li>
      ))}
  </ul>
);

export default Pagination;
