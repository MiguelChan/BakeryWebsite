import React from 'react';
import {
  Link as RouterLink,
} from 'react-router-dom';
import {
  Button,
  useTheme,
} from '@mui/material';
import { ViewAccountsDashboard } from '../../Constructed';
import { SimpleAppTemplate } from '../../Templates';

/**
 * The ViewAccountsPage component.
 *
 * @returns .
 */
export const ViewAccountsPage: React.FunctionComponent = () => {
  const currentTheme = useTheme();

  const renderBody = (): React.ReactElement => (
    <>
      <ViewAccountsDashboard />
      <Button
        component={RouterLink as any}
        to='/accounts/create'
        variant='contained'
        color='primary'
        sx={{
          marginTop: currentTheme.spacing(2),
        }}
      >
        Crear nueva cuenta
      </Button>
    </>
  );

  return (
    <SimpleAppTemplate
      renderBody={renderBody}
    />
  );
};
