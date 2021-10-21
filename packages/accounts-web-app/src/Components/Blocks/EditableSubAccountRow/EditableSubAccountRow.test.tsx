import { SubAccount } from '@mgl/shared-components';
import {
  Table,
  TableBody,
} from '@mui/material';
import {
  RenderResult,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import {
  DELETE_BUTTON,
  EditableSubAccountRow,
  EditableSubAccountRowProps,
  TEXT_FIELD,
} from './EditableSubAccountRow';
import {
  Primary,
} from './EditableSubAccountRow.stories';

describe('EditableSubAccountRow', () => {
  const setupComponent = (props: EditableSubAccountRowProps): RenderResult => {
    const Component = (
      <Table>
        <TableBody>
          <EditableSubAccountRow {...props} />
        </TableBody>
      </Table>
    );

    return render(Component);
  };

  const initialSubAccount = (): SubAccount => ({
    description: 'ADescription',
    id: 'SomeId',
  });

  it('Should display the EditableSubAccountRow', () => {
    const renderResult = setupComponent(Primary.args!);
    expect(renderResult.container).toMatchSnapshot();
  });

  it('Should call the OnDeleteClickListener when the Delete Icon is clicked', () => {
    const expectedSubAccount = initialSubAccount();
    const mockOnDelete = jest.fn();

    const props: EditableSubAccountRowProps = {
      onDeleteSubAccountClickListener: mockOnDelete,
      onSubAccountUpdatedListener: jest.fn(),
      subAccount: expectedSubAccount,
      readOnly: false,
    };

    setupComponent(props);

    expect(screen.getByTestId(DELETE_BUTTON)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(DELETE_BUTTON));

    expect(mockOnDelete).toHaveBeenCalledWith(expectedSubAccount);
  });

  it('Should not display the DeleteButton when the Account cant be editted', () => {
    const expectedSubAccount = initialSubAccount();
    expectedSubAccount.id = 'sbacct12345678912341';
    const expectedText = 'SomeText';

    const mockOnUpdate = jest.fn();

    const props: EditableSubAccountRowProps = {
      onDeleteSubAccountClickListener: jest.fn(),
      onSubAccountUpdatedListener: mockOnUpdate,
      subAccount: expectedSubAccount,
      readOnly: false,
    };

    setupComponent(props);

    expect(screen.queryByTestId(DELETE_BUTTON)).toBeNull();

    fireEvent.change(screen.getByTestId(TEXT_FIELD), {
      target: {
        value: expectedText,
      },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...expectedSubAccount,
      description: expectedText,
    });
  });

  it('Should call the onSubAccountUpdatedListener when the Name changes', () => {
    const expectedSubAccount = initialSubAccount();
    const expectedText = 'This is the new Text';
    const mockOnUpdate = jest.fn();

    const props: EditableSubAccountRowProps = {
      onDeleteSubAccountClickListener: jest.fn(),
      onSubAccountUpdatedListener: mockOnUpdate,
      subAccount: expectedSubAccount,
      readOnly: false,
    };

    setupComponent(props);

    expect(screen.getByTestId(TEXT_FIELD)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId(TEXT_FIELD), {
      target: {
        value: expectedText,
      },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...expectedSubAccount,
      description: expectedText,
    });
  });
});
