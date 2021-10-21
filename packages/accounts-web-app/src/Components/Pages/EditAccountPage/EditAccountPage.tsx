import {
  Alert,
  AlertTitle,
} from '@mui/material';
import React from 'react';
import {
  Account,
} from '@mgl/shared-components';
import { 
  Redirect, 
  useParams,
} from 'react-router-dom';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { LoadingDialog } from '../../Blocks';
import { EditableAccountForm } from '../../Constructed';
import { SimpleAppTemplate } from '../../Templates';

export interface EditAccountPageProps {

}

export const EditAccountPage: React.FunctionComponent<EditAccountPageProps> = () => {
  const {
    useEditAccount,
    useGetAccount,
  } = React.useContext<ApplicationContext>(AccountsAppContext);

  const useEditAccountState = useEditAccount();
  const useGetAccountState = useGetAccount();
  const {
    accountId,
  } = useParams<{ accountId: string }>();

  React.useEffect(() => {
    useGetAccountState.getAccount(accountId);
  }, []);

  const onSubmitAccount = (account: Account): void => {
    useEditAccountState.submitEditAccount(account);
  };

  const renderErrorAlert = (): React.ReactElement => (
    <Alert severity='error'>
      <AlertTitle>Un error ha occurrido</AlertTitle>
      {useEditAccountState.errorMessage || useGetAccountState.errorMessage}
    </Alert>
  );

  const renderBody = (props: any): React.ReactElement => {
    const {
      isAccountEdited,
      isLoading,
      errorMessage,
    } = useEditAccountState;

    const {
      isLoading: isLoadingAccount,
      errorMessage: accountErrorMessage,
      account,
    } = useGetAccountState;

    return (
      <>
        {(isLoading || isLoadingAccount) && <LoadingDialog onClose={(): void => {}} />}
        {(errorMessage || accountErrorMessage) && renderErrorAlert()}
        {isAccountEdited && <Redirect to={`/accounts/${accountId}`} />}
        {account !== null
        && <EditableAccountForm
          account={account}
          onSubmitAccount={onSubmitAccount}
          title='Editar Cuenta'
          readOnly={false}
        />
        }
      </>
    );
  };

  return (
    <SimpleAppTemplate
      renderBody={renderBody}
    />
  );
};
