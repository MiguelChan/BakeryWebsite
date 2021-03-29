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

interface Properties {
    supplier?: Supplier;
}

/**
 * Defines the Editable Supplier Form. 
 * Use this form an pass-in a supplier so you can edit it.
 * @returns 
 */
export const EditableSupplierForm: React.FunctionComponent<Properties> = ({
    supplier,
}) => {

    /**
     * Renders a single text field with an icon if provided.
     */
    function renderTextField(id: string, label: string, fullWidth: boolean, iconToUse?: any) {
        let inputProps = {};
        if (iconToUse !== null) {
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
                label={label} 
                InputProps={inputProps}
                fullWidth={fullWidth}
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
                <Grid item xs={8} alignItems='stretch'>
                    {renderTextField('supplierName', 'Nombre de Proveedor', true, <AccountCircle />)}
                </Grid>
                <Grid item xs={4} alignItems='center'>
                    <Button>
                        <Photo />
                        Agregar Imagen
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierAddress1', 'Direccion Linea 1', false, <Home />)}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierAddress2', 'Direccion Linea2', false)}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('supplierPhoneNumber', 'Numero de Telefono', false, <Phone />)}
                </Grid>
            </Grid>
        </Paper>
    );
};