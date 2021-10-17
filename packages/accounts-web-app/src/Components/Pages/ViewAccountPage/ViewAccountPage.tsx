import { isNullOrUndefined } from '@mgl/shared-components';
import {
  Alert,
  AlertTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { LoadingDialog } from '../../Blocks';
import { EditableAccountForm } from '../../Constructed';
import { SimpleAppTemplate } from '../../Templates';

export interface ViewAccountPageProps {

}

export const ViewAccountPage: React.FunctionComponent<ViewAccountPageProps> = () => {
  const {
    accountId,
  } = useParams<{ accountId: string }>();

  const {
    useGetAccount,
  } = React.useContext<ApplicationContext>(AccountsAppContext);
  const useGetAccountState = useGetAccount();

  React.useEffect(() => {
    useGetAccountState.getAccount(accountId);
  }, []);

  const renderBody = (): React.ReactElement => {
    if (useGetAccountState.isLoading) {
      return (
        <LoadingDialog onClose={null} />
      );
    }

    if (isNullOrUndefined(useGetAccountState.account)) {
      return (
        <Alert severity='error'>
          <AlertTitle>
            Oops!
          </AlertTitle>
          Ha habido un <strong>error</strong> al momento de intentar de cargar la cuenta con id.
          Favor de intentar mas tarde
        </Alert>
      );
    }

    return (
      <>
        {useGetAccountState.errorMessage && <Alert severity='error'>{useGetAccountState.errorMessage}</Alert>}
        <EditableAccountForm
          account={useGetAccountState.account}
          onSubmitAccount={(): void => {}}
          title='Vista de Cuenta'
          readOnly
        />
      </>
    );
  };

  return (
    <SimpleAppTemplate renderBody={renderBody} />
  );
};
