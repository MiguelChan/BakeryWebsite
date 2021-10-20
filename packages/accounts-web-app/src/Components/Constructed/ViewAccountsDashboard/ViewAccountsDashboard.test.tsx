import React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import { AccountType } from '@mgl/shared-components';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { ViewAccountsDashboard } from './ViewAccountsDashboard';
import {
  UseCreateAccountState,
  UseGetAccountsState,
} from '../../../Hooks';

describe('ViewAccountsDashbard', () => {
  const setupComponent = (props: ApplicationContext): RenderResult => {
    const Component = (
      <AccountsAppContext.Provider value={props}>
        <ViewAccountsDashboard />
      </AccountsAppContext.Provider>
    );
    return render(Component);
  };

  it('Should display the Loading Message', () => {
    const loadingTableProps: ApplicationContext = {
      useGetAccounts: (): UseGetAccountsState => ({
        accounts: [],
        isLoading: true,
      }),
      useCreateAccount: (): UseCreateAccountState => ({
        isAccountCreated: false,
        isLoading: false,
        requestCreateAccount: (): void => {},
        errorMessage: null,
      }),
      useGetAccount: jest.fn(),
    };

    const result = setupComponent(loadingTableProps);

    expect(result.container).toMatchSnapshot();
  });

  it('Should display the error message', () => {
    const errorMessageTableProps: ApplicationContext = {
      useGetAccounts: (): UseGetAccountsState => ({
        accounts: [],
        isLoading: false,
        errorMessage: 'Something went wrong',
      }),
      useCreateAccount: (): UseCreateAccountState => ({
        isAccountCreated: false,
        isLoading: false,
        requestCreateAccount: (): void => {},
        errorMessage: null,
      }),
      useGetAccount: jest.fn(),
    };

    const result = setupComponent(errorMessageTableProps);

    expect(result.container).toMatchSnapshot();
  });

  it('Should display empty data', () => {
    const emptyDataProps: ApplicationContext = {
      useGetAccounts: (): UseGetAccountsState => ({
        accounts: [],
        isLoading: false,
        errorMessage: undefined,
      }),
      useCreateAccount: (): UseCreateAccountState => ({
        isAccountCreated: false,
        isLoading: false,
        requestCreateAccount: (): void => {},
        errorMessage: null,
      }),
      useGetAccount: jest.fn(),
    };

    const result = setupComponent(emptyDataProps);

    expect(result.container).toMatchSnapshot();
  });

  it('Should display the data', () => {
    const withDataProps: ApplicationContext = {
      useGetAccounts: (): UseGetAccountsState => ({
        accounts: [
          {
            accountType: AccountType.Entry,
            id: 'SomeId',
            subAccounts: [],
            title: 'A title',
          },
        ],
        isLoading: false,
        errorMessage: undefined,
      }),
      useCreateAccount: (): UseCreateAccountState => ({
        isAccountCreated: false,
        isLoading: false,
        requestCreateAccount: (): void => {},
        errorMessage: null,
      }),
      useGetAccount: jest.fn(),
    };

    const result = setupComponent(withDataProps);

    expect(result.container).toMatchSnapshot();
  });
});
