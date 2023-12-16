import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import Chevron from '../Common/BasicIcons/Chevron/Chevron';

interface IProps {
  title: string;
  sortColumn: string;
  sortOrder: string;
  sortName?: string;

}

// todo this header is not necesseraly sortable any more so name change might be in order
function SortableTableHeader({ title, sortColumn, sortOrder, sortName }: IProps): ReactElement {
  return (
    <div className="flex flex-row items-center">
      <p>
        {title}
      </p>
      {sortColumn === sortName && sortOrder === 'asc' && <Chevron direction="down" />}
      {sortColumn === sortName && sortOrder === 'desc' && <Chevron direction="up" />}
    </div>

  );
}

export default SortableTableHeader;
