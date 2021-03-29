import { 
    Fab,
    makeStyles,
    Paper,
} from '@material-ui/core';
import * as React from 'react';
import theme from '../../../theme';
import { 
    SupplierContactsTable,
} from '../../Blocks/SuppliersContactsTable/SupplierContactsTable';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: 15,
    }
}));

/**
 * Defines the Editable Contacts Table for the Supplier.
 * @param 
 * @returns The Editable SupplierContactsTable.
 */
export const EditableSupplierContactsTable: React.FunctionComponent = ({}) => {

    const classes = useStyles(theme);

    return (
        <Paper>
            <SupplierContactsTable contacts={[]} />
            <Fab variant='extended' className={classes.addButton}>
                Agregar nuevo Contacto
            </Fab>
        </Paper>
    );
};