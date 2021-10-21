import { isNullOrUndefined } from '@mgl/shared-components';
import {
  Alert,
  AlertTitle,
  Button,
  useTheme,
} from '@mui/material';
import React from 'react';
import {
  useHistory,
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

  const currentTheme = useTheme();
  const currentHistory = useHistory();

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

  const redirectToEditAccount = () => {
    currentHistory.push(`${accountId}/edit`);
  };

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
        <Button 
          variant='contained' 
          color='primary'
          sx={{
            marginTop: currentTheme.spacing(2),
          }}
          onClick={redirectToEditAccount}
        >
          Editar Cuenta
        </Button>
      </>
    );
  };

  return (
    <SimpleAppTemplate renderBody={renderBody} />
  );
};
