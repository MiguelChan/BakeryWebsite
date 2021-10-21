import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { EditAccountPage } from './EditAccountPage';
import {
  FetchingAccount,
  WithAccount,
  WithAccountErrorMessage,
  WithEditAccountErrorMessage,
} from './EditAccountPage.stories';
import { MemoryRouter } from 'react-router';
import {
  Account, AccountType,
} from '@mgl/shared-components';
import { UseEditAccountState, UseGetAccountState } from '../../../Hooks';
import { CREATE_ACCOUNT_ID } from '../../Constructed/EditableAccountForm/EditableAccountForm';

interface Props {
  applicationContext: ApplicationContext;
}

describe('EditAccountPage', () => {
  const setupComponent = (props: Props) => {
    const Component = (
      <AccountsAppContext.Provider value={props.applicationContext}>
        <MemoryRouter>
          <EditAccountPage />
        </MemoryRouter>
      </AccountsAppContext.Provider>
    );

    return render(Component);
  };

  it.skip('Should display the FetchingAccount Loading Dialog', () => {
    const renderResult = setupComponent(FetchingAccount.args);
    expect(renderResult).toMatchSnapshot();
  });

  it('Should display the AccountErrorMessage', () => {
    const renderResult = setupComponent(WithAccountErrorMessage.args);
    expect(renderResult).toMatchSnapshot();
  });

  it('Should display the EditAccountErrorMessage', () => {
    const renderResult = setupComponent(WithEditAccountErrorMessage.args);
    expect(renderResult).toMatchSnapshot();
  });

  it('Should display the Account', () => {
    const renderResult = setupComponent(WithAccount.args);
    expect(renderResult).toMatchSnapshot();
  });

  it('Should submit the Account when requested', () => {
    const testAccount: Account = {
      accountType: AccountType.Capital,
      id: 'SomeId',
      subAccounts: [
        {
          id: 'sbacct12345',
          description: 'We cant delete this',
        },
        {
          id: 'tempId',
          description: 'We can delete this',
        },
      ],
      title: 'Account to Edit',
    };

    const mockGetAccount = jest.fn();
    const mockSubmitAccountFn = jest.fn();

    const appContext: ApplicationContext = {
      useGetAccount: (): UseGetAccountState => ({
        account: testAccount,
        getAccount: mockGetAccount,
        isLoading: false,
        errorMessage: null,
      }),
      useEditAccount: (): UseEditAccountState => ({
        isAccountEdited: false,
        isLoading: false,
        submitEditAccount: mockSubmitAccountFn,
        errorMessage: null,
      }),
    } as any;

    const props: Props = {
      applicationContext: appContext,
    };

    setupComponent(props);

    act(() => {
      fireEvent.click(screen.getByTestId(CREATE_ACCOUNT_ID));
    });

    waitFor(() => {
      expect(mockSubmitAccountFn).toHaveBeenCalledWith(testAccount);
    });
    expect(mockGetAccount).toHaveBeenCalled();
  });
});
