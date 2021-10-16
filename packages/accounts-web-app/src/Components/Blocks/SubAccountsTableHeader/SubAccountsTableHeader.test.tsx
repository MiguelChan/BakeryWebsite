import React from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react';
import {
  Table,
} from '@mui/material';
import {
  SubAccountsTableHeader,
} from './SubAccountsTableHeader';

describe('SubAccountsTableHeader', () => {
  const setupComponent = (): RenderResult => {
    const Component = (
      <Table>
        <SubAccountsTableHeader />
      </Table>
    );

    return render(Component);
  };

  it('Should display the SubAccountsTableHeader', () => {
    const renderResult = setupComponent();
    expect(renderResult.container).toMatchSnapshot();
  });
});
