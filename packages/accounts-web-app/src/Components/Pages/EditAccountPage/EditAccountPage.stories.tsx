import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  Account,
  AccountType,
} from '@mgl/shared-components';
import { EditAccountPage } from './EditAccountPage';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import {
  UseEditAccountState,
  UseGetAccountState,
} from '../../../Hooks';

export default {
  title: 'Components/Pages/EditAccountPage',
  component: EditAccountPage,
} as Meta;

interface ContextProps {
  applicationContext: ApplicationContext;
}

const Template: Story<ContextProps> = (props) => (
  <AccountsAppContext.Provider value={props.applicationContext}>
    <EditAccountPage />
  </AccountsAppContext.Provider>
);

const TestAccount: Account = {
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

export const FetchingAccount = Template.bind({});
FetchingAccount.args = {
  applicationContext: {
    useGetAccount: (): UseGetAccountState => ({
      isLoading: true,
      account: null,
      getAccount: (): void => {},
    }),
    useEditAccount: (): UseEditAccountState => ({
      isAccountEdited: false,
      isLoading: false,
      submitEditAccount: (): void => {
      },
    }),
  },
};

export const WithAccountErrorMessage = Template.bind({});
WithAccountErrorMessage.args = {
  applicationContext: {
    useGetAccount: (): UseGetAccountState => ({
      isLoading: false,
      account: null,
      getAccount: (): void => {},
      errorMessage: 'Account Error Message',
    }),
    useEditAccount: (): UseEditAccountState => ({
      isAccountEdited: false,
      isLoading: false,
      submitEditAccount: (): void => {},
    }),
  },
};

export const WithEditAccountErrorMessage = Template.bind({});
WithEditAccountErrorMessage.args = {
  applicationContext: {
    useGetAccount: (): UseGetAccountState => ({
      isLoading: false,
      account: null,
      getAccount: (): void => {},
    }),
    useEditAccount: (): UseEditAccountState => ({
      isAccountEdited: false,
      isLoading: false,
      submitEditAccount: (): void => {},
      errorMessage: 'PutAccount Error Message',
    }),
  },
};

export const WithAccount = Template.bind({});
WithAccount.args = {
  applicationContext: {
    useGetAccount: (): UseGetAccountState => ({
      isLoading: false,
      account: TestAccount,
      getAccount: (): void => {},
    }),
    useEditAccount: (): UseEditAccountState => ({
      isAccountEdited: false,
      isLoading: false,
      submitEditAccount: (account: Account): void => {
        action('onSubmitEditAccount');
        console.info('AccountEditted: ', JSON.stringify(account));
      },
    }),
  },
};
