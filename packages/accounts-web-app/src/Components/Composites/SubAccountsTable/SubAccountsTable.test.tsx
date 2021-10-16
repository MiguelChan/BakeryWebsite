import React from 'react';
import {
  RenderResult,
  render,
} from '@testing-library/react';
import {
  SubAccountsTable,
  SubAccountsTableProps,
} from './SubAccountsTable';
import {
  Primary,
  WithEditableRows,
} from './SubAccountsTable.stories';

describe('SubAccountsTable', () => {
  const setupComponent = (props: SubAccountsTableProps): RenderResult => {
    const Component = (
      <SubAccountsTable {...props} />
    );
    return render(Component);
  };

  it('Should display a Table with a CustomBody', () => {
    const props = Primary.args!;
    const renderResult = setupComponent(props);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should display a Table with the EditableSubAccountsTableRow', () => {
    const props = WithEditableRows.args!;
    const renderResult = setupComponent(props);
    expect(renderResult.container).toMatchSnapshot();
  });
});
