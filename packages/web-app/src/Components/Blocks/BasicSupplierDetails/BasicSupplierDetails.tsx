import { Grid, InputAdornment, Paper, TextField } from '@material-ui/core';
import { AccountCircle, Home, Phone } from '@material-ui/icons';
import * as React from 'react';
import { Supplier } from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';

interface Properties {
    supplier: Supplier;
}

/**
 * Defines a simple view that contains the details of a Supplier.
 * @param {Supplier} supplier The supplier to display.
 * @returns A React Component.
 */
export const BasicSupplierDetails: React.FunctionComponent<Properties> = ({
    supplier,
}) => {

    function buildTextField(
        label: string, 
        value: string, 
        iconToUse?: any,
        dataTestId?: string,
    ) {
        let inputProps = {
        };

        if (!isNullOrUndefined(iconToUse)) {
            inputProps = {
                startAdornment: (
                    <InputAdornment position='start'>
                        {iconToUse}
                    </InputAdornment>
                ),
            }
        }

        return (
            <TextField 
                label={label}
                value={value}
                aria-label={label}
                data-testid={dataTestId}
                disabled
                InputProps={inputProps}
                fullWidth
            />
        );
    }

    return (
        <Paper>
            <Grid container alignItems='center' justify='space-evenly' spacing={2}>
                <Grid item xs={8}>
                    {buildTextField('Nombre de Proveedor', supplier.name, <AccountCircle />)}
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    {buildTextField('Direccion Linea 1', supplier.lineAddress1, <Home />)}
                </Grid>
                <Grid item xs={4}>
                    {buildTextField('Direccion Linea 2', supplier.lineAddress2)}
                </Grid>
                <Grid item xs={4}>
                    {buildTextField('Numero de Telefono', supplier.phoneNumber, <Phone />)}
                </Grid>
            </Grid>
        </Paper>
    );
};