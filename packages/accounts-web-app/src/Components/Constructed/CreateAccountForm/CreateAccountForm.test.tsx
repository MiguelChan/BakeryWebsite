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
  Account, AccountType,
} from '@mgl/shared-components';
import { ACCOUNT_TITLE_ID, ADD_SUB_ACCOUNT_ID, CreateAccountForm, CreateAccountFormProps, CREATE_ACCOUNT_ID } from './CreateAccountForm';
import { DELETE_BUTTON, TEXT_FIELD } from '../../Blocks';

describe('CreateAccountForm', () => {
  const setupComponent = (props: CreateAccountFormProps): RenderResult => {
    const Component = (
      <CreateAccountForm {...props} />
    );
    return render(Component);
  };

  it('Should call the onSubmitAccount Function only when the accounts title is filled in', async () => {
    const mockOnSubmit = jest.fn();
    const props: CreateAccountFormProps = {
      onSubmitAccount: mockOnSubmit,
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