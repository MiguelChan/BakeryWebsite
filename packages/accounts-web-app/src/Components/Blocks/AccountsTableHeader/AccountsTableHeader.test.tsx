import React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import { Table, TableHead } from '@mui/material';
import { AccountsTableHeader } from './AccountsTableHeader';

describe('AccountsTableHeader', () => {
  const setupComponent = (): RenderResult => {
    const Component = (
      <Table>
        <TableHead>
          <AccountsTableHeader />
        </TableHead>
      </Table>
    );
    return render(Component);
  };

  it('Should display the data', () => {
    const component = setupComponent();
    expect(component.container).toMatchSnapshot();
  });
});