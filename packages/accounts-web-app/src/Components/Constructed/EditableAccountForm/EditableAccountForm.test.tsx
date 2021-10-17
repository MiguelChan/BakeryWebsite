import React from 'react';
import {
  render,
  act,
  fireEvent,
  screen,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import {
  Account,
  AccountType,
} from '@mgl/shared-components';
import {
  ACCOUNT_TITLE_ID,
  ADD_SUB_ACCOUNT_ID,
  EditableAccountForm,
  EditableAccountFormProps,
  CREATE_ACCOUNT_ID,
} from './EditableAccountForm';
import {
  DELETE_BUTTON,
  TEXT_FIELD,
} from '../../Blocks';

describe('EditableAccountForm', () => {
  const setupComponent = (props: EditableAccountFormProps): RenderResult => {
    const Component = (
      <EditableAccountForm {...props} />
    );
    return render(Component);
  };

  it('Should call the onSubmitAccount Function only when the accounts title is filled in', async () => {
    const mockOnSubmit = jest.fn();
    const props: EditableAccountFormProps = {
      onSubmitAccount: mockOnSubmit,
      account: {
        title: '',
        accountType: AccountType.Capital,
        subAccounts: [],
      } as any,
      readOnly: false,
    };

    setupComponent(props);

    const expectedAccountTitle = 'This is a Title';
    const expectedAccount: Account = {
      id: '',
      title: expectedAccountTitle,
      accountType: AccountType.Capital,
      subAccounts: [],
    };

    fireEvent.click(screen.getByTestId(CREATE_ACCOUNT_ID));
    expect(mockOnSubmit).not.toHaveBeenCalled();

    await waitFor(() => {
      fireEvent.change(screen.getByTestId(ACCOUNT_TITLE_ID), {
        target: {
          value: expectedAccountTitle,
        },
      });
    });

    fireEvent.click(screen.getByTestId(ADD_SUB_ACCOUNT_ID));
    fireEvent.click(screen.getByTestId(DELETE_BUTTON));

    fireEvent.click(screen.getByTestId(ADD_SUB_ACCOUNT_ID));
    fireEvent.change(screen.getByTestId(TEXT_FIELD), {
      target: {
        value: 'This is something',
      },
    });
  });
});
