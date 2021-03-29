import { 
    Paper, 
} from '@material-ui/core';
import * as React from 'react';
import { 
    Supplier,
} from '../../../Models';
import { 
    EditableSupplierContactsTable, 
} from '../../Composites/EditableSupplierContactsTable/EditableSupplierContactsTable';
import { 
    EditableSupplierForm,
} from '../../Composites/EditableSupplierForm/EditableSupplierForm';

interface Properties {
    supplier?: Supplier;
}

/**
 * Defined the Supplier Editable View.
 * @param props .
 */
export const SupplierEditableView: React.FunctionComponent<Properties> = ({
    supplier,
}) => {

    return (
        <Paper>
            <EditableSupplierForm />
            <EditableSupplierContactsTable />
        </Paper>
    );

};