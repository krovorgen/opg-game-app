import React, { memo } from 'react';
import { UserType } from '../../../api/auth';

type TableUserProps = {
  user: UserType;
};

export const TableUser = memo(({ user }: TableUserProps) => {
  const rows = [];
  for (let key in user) {
    rows.push({ key, value: (user as any)[key] });
  }
  return (
    <table>
      <tbody>
        {rows.map((item) => (
          <tr key={Math.random()}>
            <td>{item.key}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
