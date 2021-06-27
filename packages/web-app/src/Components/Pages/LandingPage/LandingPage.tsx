import { Grid } from '@material-ui/core';
import { AccountTree, ContactMail } from '@material-ui/icons';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { LandingPageBlock, LandingPageBlockProps } from '../../Blocks';

/**
 * Defines the LandingPage section of the Application.
 * @returns .
 */
export const LandingPage: React.FunctionComponent = () => {

    const history = useHistory();

    const appModules: LandingPageBlockProps[] = [
        {
            blockIcon: <AccountTree />,
            blockTitle: 'Administracion de Cuentas',
            onBlockClick: () => changePath('/accounts'),
        },
        {
            blockIcon: <ContactMail />,
            blockTitle: 'Catalogo de Proveedores',
            onBlockClick: () => changePath('/suppliers'),
        },
    ];

    function changePath(newPath: string) {
        history.push({
            pathname: newPath,
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item>
                <LandingPageBlock {...appModules[0]} />
            </Grid>
            <Grid item>
                <LandingPageBlock {...appModules[1]} />
            </Grid>
        </Grid>
    );
};