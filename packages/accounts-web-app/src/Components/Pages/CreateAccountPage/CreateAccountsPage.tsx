import React from 'react';
import {
  Account,
} from '@mgl/shared-components';
import { AccountsAppContext, ApplicationContext } from '../../../Context';
import { CreateAccountForm } from '../../Constructed/CreateAccountForm/CreateAccountForm';
import { SimpleAppTemplate } from '../../Templates';
import { LoadingDialog } from '../../Blocks';
import { Alert, AlertTitle } from '@mui/material';
import { Redirect } from 'react-router-dom';

export const CreateAccountsPage: React.FunctionComponent = () => {

  const {
    useCreateAccount,
  } = React.useContext<ApplicationContext>(AccountsAppContext);
  const useCreateAccountState = useCreateAccount();

  React.useEffect(() => {
    
  }, [useCreateAccountState]);

  const onSubmitAccount = (account: Account): void => {
    useCreateAccountState.requestCreateAccount(account);
  }

  const renderErrorAlert = (): React.ReactElement => (
    <Alert severity='error'>
      <AlertTitle>Un error ha ocurrido</AlertTitle>
      {useCreateAccountState.errorMessage}
    </Alert>
  );

  const renderBody = (props: any): React.ReactElement => {
    const {
      errorMessage,
      isLoading,
      isAccountCreated,
    } = useCreateAccountState;
    return (
      <>
        {isLoading && <LoadingDialog onClose={(): void => {}}/>}
        {errorMessage && renderErrorAlert()}
        {isAccountCreated && <Redirect to='/accounts' />}
        <CreateAccountForm 
          {...props}
          onSubmitAccount={onSubmitAccount}
        />
      </>
    );
  }

  return (
    <SimpleAppTemplate
      renderBody={renderBody}
    />
  );
};
