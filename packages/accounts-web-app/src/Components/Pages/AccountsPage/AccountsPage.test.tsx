import React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AccountType } from '@mgl/shared-components';
import {
  AccountsPage,
  AccountsPageProps,
} from './AccountsPage';
import {
  EmptyTable,
  LoadingTable,
  WithData,
} from './AccountsPage.stories';
import {
  UseCreateAccountState,
  UseGetAccountsState,
} from '../../../Hooks';

describe('AccountsPage', () => {
  const setupComponent = (props: AccountsPageProps): RenderResult => render(
    <MemoryRouter>
      <AccountsPage {...props} />
    </MemoryRouter>,
  );

  it('Should display the loading page', () => {
    const loadingPageProps: AccountsPageProps = {
      appContext: {
        useGetAccounts: (): UseGetAccountsState => ({
          accounts: [],
          isLoading: true,
        }),
        useCreateAccount: (): UseCreateAccountState => ({
          isAccountCreated: false,
          isLoading: false,
          requestCreateAccount: (): void => {},
          errorMessage: undefined,
        }),
      },
    };

    const result = setupComponent(loadingPageProps);

    expect(result.container).toMatchSnapshot();
  });

  it('Should display the Data', () => {
    const props: AccountsPageProps = {
      appContext: {
        useGetAccounts: (): UseGetAccountsState => ({
          isLoading: false,
          accounts: [
            {
              accountType: AccountType.Entry,
              id: 'Some-id',
              subAccounts: [],
              title: 'Some TItle',
            },
          ],
        }),
        useCreateAccount: (): UseCreateAccountState => ({
          isAccountCreated: false,
          isLoading: false,
          requestCreateAccount: (): void => {},
          errorMessage: undefined,
        }),
      },
    };

    const result = setupComponent(props);

    expect(result.container).toMatchSnapshot();
  });

  it('Should display the empty table', () => {
    const props: AccountsPageProps = EmptyTable.args!;

    const result = setupComponent(props);

    expect(result.container).toMatchSnapshot();
  });
});
