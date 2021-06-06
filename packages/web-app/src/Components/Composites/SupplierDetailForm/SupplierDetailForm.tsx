import { Container, Fab, Paper } from '@material-ui/core';
import * as React from 'react';
import { 
    Supplier,
} from '../../../Models';
import { BasicSupplierDetails, OnButtonClickListener, SupplierContactsTable } from '../../Blocks';

interface Properties {
    supplier: Supplier;
    onEditSupplierClickListener: OnButtonClickListener;
}

/**
 * Defines the Supplier Detail Form. This one includes the {BasicSupplierDetails} and the {SupplierContactsTable}.
 * @param {Supplier} supplier The supplier to display.
 * @param {OnButtonClickListener} onEditSupplierClickListener Called when an edit is requested.
 * @returns 
 */
export const SupplierDetailForm: React.FunctionComponent<Properties> = ({
    supplier,
    onEditSupplierClickListener,
}) => {
    return (
        <Container>
            <BasicSupplierDetails 
                supplier={supplier}
            />
            <Paper>
                <SupplierContactsTable 
                    canDeleteContact={false}
                    contacts={supplier.contacts}
                    onDeleteContactClickListener={() => {}}
                />
            </Paper>
            <Fab
                color='primary'
                aria-label='EditSupplier'
                variant='extended'
                onClick={onEditSupplierClickListener}
            >
                Editar Proveedor
            </Fab>
        </Container>
    );
}