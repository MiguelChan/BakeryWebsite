import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountType } from '@mgl/shared-components';
import { ViewAccountPage } from './ViewAccountPage';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { UseGetAccountState } from '../../../Hooks';

export default {
  title: 'Components/Pages/ViewAccountPage',
  component: ViewAccountPage,
} as Meta;

interface Props {
  appContext: ApplicationContext;
}

const Template: Story<Props> = ({ appContext }) => (
  <AccountsAppContext.Provider value={appContext}>
    <ViewAccountPage />
  </AccountsAppContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  appContext: {
    useGetAccount: (): UseGetAccountState => ({
      account: null,
      getAccount: (): void => {},
      isLoading: false,
      errorMessage: undefined,
    }),
  },
};

export const Loading = Template.bind({});
Loading.args = {
  appContext: {
    useGetAccount: (): UseGetAccountState => ({
      account: null,
      getAccount: (): void => {},
      isLoading: true,
      errorMessage: undefined,
    }),
  },
};

export const WithAccount = Template.bind({});
WithAccount.args = {
  appContext: {
    useGetAccount: (): UseGetAccountState => ({
      account: {
        accountType: AccountType.Expenses,
        id: 'SomeSome',
        subAccounts: [{
          description: 'SomeSomeDescription',
          id: 'SomeSeme',
        }],
        title: 'AnAcct',
      },
      getAccount: (): void => {},
      isLoading: false,
      errorMessage: undefined,
    }),
  },
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  appContext: {
    useGetAccount: (): UseGetAccountState => ({
      account: {
        accountType: AccountType.Expenses,
        id: 'SomeSome',
        subAccounts: [{
          description: 'SomeSomeDescription',
          id: 'SomeSeme',
        }],
        title: 'AnAcct',
      },
      getAccount: (): void => {},
      isLoading: false,
      errorMessage: 'Hay un error intermitente',
    }),
  },
};
