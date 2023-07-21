import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

type TableRowProps = {
  index: number;
  wpm: number;
  time: number;
  date: string;
  username: string;
};

const TableRow: React.FC<TableRowProps> = ({
  index,
  wpm,
  time,
  date,
  username,
}) => {
  return (
    <tr
      className={clsxm('whitespace-nowrap border-t-4 border-font/80', [
        index % 2 === 0 ? 'bg-hl' : 'bg-hl/20',
      ])}
    >
      <td className='py-3 pl-4 bg-opacity-60'>
        <span className='text-bg'>
          {index === 0 ? <FaCrown className='my-1' /> : index + 1}
        </span>
      </td>

      <td className='px-2 md:px-0'>
        <div className='flex items-center gap-2 text-bg'>
          <FaUserCircle /> {username}
        </div>
      </td>

      <td className='px-2 text-bg md:px-0 bg-opacity-60'>
      <div className='flex items-center gap-2 text-bg'>
          {wpm} wpm
        </div>
      </td>

      <td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0 bg-opacity-60'>
        {time}s
      </td>

      <td className='px-2 text-sm text-bg md:px-0'>
        {date}
      </td>
    </tr>
  );
};

export default TableRow;
