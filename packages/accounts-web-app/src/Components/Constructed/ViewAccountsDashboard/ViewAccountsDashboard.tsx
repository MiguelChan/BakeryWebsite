import { isNullOrUndefined } from '@mgl/shared-components';
import React from 'react';
import { GetAccountsApiFn } from '../../../Clients';
import { 
  AccountsAppContext, 
  ApplicationContext,
} from '../../../Context';
import { 
  useGetAccounts, 
  UseGetAccounts, 
  UseGetAccountsState,
} from '../../../Hooks';
import { AccountsTable } from '../../Composites';

export interface ViewAccountsDashboardProps {
}

export const ViewAccountsDashboard: React.FunctionComponent<ViewAccountsDashboardProps> = ({
}) => {

  const appDependencies: ApplicationContext = React.useContext<ApplicationContext>(AccountsAppContext);
  const useGetAccountState: UseGetAccountsState = appDependencies.useGetAccounts();

  const renderComponent = (): React.ReactElement => {
    const {
      accounts,
      isLoading,
      errorMessage,
    } = useGetAccountState;

    if (isLoading) {
      return <span>Loading data...</span>;
    }

    if (!isNullOrUndefined(errorMessage)) {
      return <span>{errorMessage}</span>
    }

    return <AccountsTable accounts={accounts} />;
  };

  return renderComponent();
};