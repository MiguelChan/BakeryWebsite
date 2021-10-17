import {
  AccountType,
  SubAccount,
  Account,
} from '@mgl/shared-components';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TableBody,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SubAccountsTable,
  TableBodyProps,
} from '../../Composites';
import {
  EditableSubAccountRow,
} from '../../Blocks';

export const ACCOUNT_TITLE_ID = 'AccountTitleId';
export const CREATE_ACCOUNT_ID = 'CreateAccountId';
export const ADD_SUB_ACCOUNT_ID = 'AddSubAccountId';

export interface EditableAccountFormProps {
  onSubmitAccount: (account: Account) => void;
  title?: string;
  readOnly: boolean;
  account: Account;
}

const validateSchema = yup.object({
  title: yup
    .string()
    .required('El titulo de cuenta es requerido')
    .max(10, 'El titulo de cuenta no puede ser mayor a 10 caracters'),
  accountType: yup
    .string()
    .required()
    .oneOf([AccountType.Capital, AccountType.Expenses, AccountType.Entry]),
  subAccounts: yup
    .array().of(
      yup.object({
        description: yup
          .string()
          .required(),
      }),
    ),
});

/**
 * Defines the EditableAccountForm.
 *
 * @returns .
 */
export const EditableAccountForm: React.FunctionComponent<EditableAccountFormProps> = ({
  onSubmitAccount,
  account = {
    title: '',
    accountType: AccountType.Capital,
    subAccounts: [],
  },
  readOnly,
  title = 'Creacion de Cuenta',
}) => {
  const currentTheme = useTheme();
  const [currentSubAccounts, setCurrentSubAccounts] = React.useState<SubAccount[]>([]);

  React.useEffect(() => {
    setCurrentSubAccounts(account.subAccounts);
  }, []);

  const handleFormikSubmit = (values) => {
    const accountToCreate: Account = {
      ...values,
      subAccounts: currentSubAccounts,
    };
    onSubmitAccount(accountToCreate);
  };

  const formik = useFormik({
    initialValues: account,
    validationSchema: validateSchema,
    onSubmit: handleFormikSubmit,
  });

  const onDeleteSubAccountListener = (subAccount: SubAccount): void => {
    const {
      id,
    } = subAccount;

    const updatedSubAccounts = currentSubAccounts
      .filter((currentSubAccount: SubAccount) => currentSubAccount.id !== id);
    setCurrentSubAccounts(updatedSubAccounts);
  };

  const onSubAccountUpdated = (updatedSubAccount: SubAccount): void => {
    const indexToUpdate = currentSubAccounts.map((subAccount) => subAccount.id).indexOf(updatedSubAccount.id);
    const updatedSubAccounts = [...currentSubAccounts];
    updatedSubAccounts[indexToUpdate] = updatedSubAccount;
    setCurrentSubAccounts(updatedSubAccounts);
  };

  const renderTableBody = (props: TableBodyProps): React.ReactElement => {
    const {
      subAccounts,
    } = props;

    const rows = subAccounts.map((currentSubAccount: SubAccount, index: number) => (
      <EditableSubAccountRow
        key={currentSubAccount.id}
        onDeleteSubAccountClickListener={onDeleteSubAccountListener}
        subAccount={currentSubAccount}
        onSubAccountUpdatedListener={onSubAccountUpdated}
        readOnly={readOnly}
      />
    ));

    return (
      <TableBody>
        {rows}
      </TableBody>
    );
  };

  const renderSubAccountsTable = (): React.ReactElement => (
    <SubAccountsTable
      subAccounts={currentSubAccounts}
      tableBody={renderTableBody}
    />
  );

  const addSubAccount = (): void => {
    const newSubAccounts: SubAccount[] = [
      ...currentSubAccounts,
      {
        id: `${new Date().getUTCMilliseconds()}`,
        description: '',
      },
    ];

    setCurrentSubAccounts(newSubAccounts);
  };

  const renderButtons = (): React.ReactElement => {
    if (readOnly) {
      return <></>;
    }

    return (
        <Grid
          container
          sx={{
            paddingTop: currentTheme.spacing(2),
          }}
          spacing={2}
        >
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              form="create-account"
              data-testid={CREATE_ACCOUNT_ID}
            >
              {title}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={addSubAccount}
              data-testid={ADD_SUB_ACCOUNT_ID}
            >
              Agregar Subcuenta
            </Button>
          </Grid>
        </Grid>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: currentTheme.spacing(2),
      }}
    >
      <Typography
        variant="h5"
        component="h4"
        textAlign="center"
        sx={{
          marginBottom: currentTheme.spacing(3),
        }}
      >
        {title}
      </Typography>
      <form onSubmit={formik.handleSubmit} id="create-account">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Cuenta"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              disabled={readOnly}
              inputProps={{
                'data-testid': ACCOUNT_TITLE_ID,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Cuenta</InputLabel>
              <Select
                value={formik.values.accountType}
                onChange={formik.handleChange}
                id="accountType"
                name="accountType"
                label="Tipo de Cuenta"
                disabled={readOnly}
              >
                <MenuItem value={AccountType.Capital}>Capital</MenuItem>
                <MenuItem value={AccountType.Entry}>Entrada</MenuItem>
                <MenuItem value={AccountType.Expenses}>Gastos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item>
            <Typography>
              Subcuentas
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            {renderSubAccountsTable()}
          </Grid>
        </Grid>
        {renderButtons()}
      </form>
    </Paper>
  );
};
