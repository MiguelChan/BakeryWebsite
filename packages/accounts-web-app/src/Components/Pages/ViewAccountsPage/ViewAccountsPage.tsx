import React from 'react';
import { ViewAccountsDashboard } from '../../Constructed';
import { SimpleAppTemplate } from '../../Templates';
import {
  Link as RouterLink,
} from 'react-router-dom';
import { Button, useTheme } from '@mui/material';

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
