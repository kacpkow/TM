import React, { useState } from 'react';
import _ from 'lodash';
import * as Icon from 'react-feather';
import Pagination from './Pagination';

import './style.scss';

const Table = ({ data, columns, perPage = 8 }) => {
  const [page, setPage] = useState(0);

  if (!_.isArray(data)) {
    console.log(data);
    return null;
  }

  const totalPages = Math.ceil(data.length / perPage);
  const limitItems = items => items.slice(page * perPage).slice(0, perPage);

  return (
    <>
      <div className="table">
        <table className="table__content">
          <thead className="table__head">
            <tr className="table__row">
              {columns.map(({ label }) => (
                <th key={label} className="table__column">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="table__body">
            {limitItems(data).map(row => (
              <tr key={row.id} className="table__row">
                {columns.map(({ key, empty = '-', format }, index) => (
                  <td key={`${row.id}_${index}`} className="table__column">
                    {format ? format(row) : row[key] || empty}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="table__empty">
            <Icon.Database />
            <div>Brak danych</div>
          </div>
        )}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} page={page} onChange={setPage} />}

      {page > 1 && (
        <div>
          Strona {page + 1} na {totalPages}
        </div>
      )}
    </>
  );
};

export default Table;
