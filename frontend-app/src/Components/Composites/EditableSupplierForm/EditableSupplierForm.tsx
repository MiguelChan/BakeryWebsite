import { 
    Button, 
    Grid, 
    InputAdornment, 
    Paper, 
    TextField,
} from '@material-ui/core';
import { 
    AccountCircle, 
    Home, 
    Phone, 
    Photo,
} from '@material-ui/icons';
import * as React from 'react';
import { 
    Supplier,
} from '../../../Models';

export type OnSupplierChangedListener = (supplier: Supplier) => void;

interface Properties {
    supplier: Supplier;
    onSupplierChangedListener: OnSupplierChangedListener;
}

/**
 * Defines the Editable Supplier Form. 
 * Use this form an pass-in a supplier so you can edit it.
 * @param {Supplier} supplier A supplier to use as a base.
 * @param {OnSupplierChangedListener} onSupplierChangedListener Listener to be called whenever a change in the Supplier occurs.
 * @returns {EditableSupplierForm} The component.
 */
export const EditableSupplierForm: React.FunctionComponent<Properties> = ({
    supplier,
    onSupplierChangedListener,
}) => {

    function onNameChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        onSupplierChangedListener({
            ...supplier,
            name: event.target.value,
        });
    }

    function onLineAddress1ChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        onSupplierChangedListener({
            ...supplier,
            addressLine1: event.target.value,
        });
    }

    function onLineAddress2ChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        onSupplierChangedListener({
            ...supplier,
            addressLine2: event.target.value,
        });
    }

    function onPhoneNumberChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        onSupplierChangedListener({
            ...supplier,
            phoneNumber: event.target.value,
        });
    }

    /**
     * Renders a single text field with an icon if provided.
     */
    function renderTextField(
        id: string, 
        label: string, 
        isRequired: boolean, 
        fullWidth: boolean, 
        onAttributeChangedListener: (event: React.ChangeEvent<HTMLInputElement>) => void,
        iconToUse?: any) {
        let inputProps = {
        };
        if (iconToUse !== null && iconToUse !== undefined) {
            inputProps = {
                startAdornment: (
                    <InputAdornment position='start'>
                        {iconToUse}
                    </InputAdornment>
                ),
            };
        }
        return (
            <TextField
                id={id}
                data-testid={id}
                label={label}
                aria-label={label}
                InputProps={inputProps}
                fullWidth={fullWidth}
                required={isRequired}
                onChange={onAttributeChangedListener}
            />
        );
    }
    
    return (
        <Paper>
            <Grid 
                container
                alignItems='center'
                justify='space-evenly'
                spacing={2} 
            >
                <Grid item xs={8} container alignItems='stretch'>
                    {renderTextField('supplierName', 'Nombre de Proveedor', true, true, onNameChangedListener, <AccountCircle />)}
                </Grid>
                <Grid item xs={4} container alignItems='center'>
                    <Button>
                        <Photo />
                        Agregar Imagen
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierAddress1', 'Direccion Linea 1', true, false, onLineAddress1ChangedListener, <Home />)}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierAddress2', 'Direccion Linea 2', false, false, onLineAddress2ChangedListener)}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierPhoneNumber', 'Numero de Telefono', false, false, onPhoneNumberChangedListener, <Phone />)}
                </Grid>
            </Grid>
        </Paper>
    );
};