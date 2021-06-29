import * as React from 'react';
import { 
    Button,
    makeStyles,
    Paper,
} from '@material-ui/core';
import { 
    Contact,
} from '../../../Models';
import theme from '../../../theme';
import { 
    CreateContactDialog, 
    OnCreateContactClickListener,
} from '../../Blocks/CreateContactDialog';
import { 
    OnDeleteContactClickListener,
    SupplierContactsTable,
} from '../../Blocks/SuppliersContactsTable';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: 15,
    }
}));

interface Properties {
    contacts: Contact[];
    onCreateContactClickListener: OnCreateContactClickListener;
    onDeleteContactClickListener: OnDeleteContactClickListener;
}

/**
 * Defines the Editable Contacts Table for the Supplier.
 * @param 
 * @returns The Editable SupplierContactsTable.
 */
export const EditableSupplierContactsTable: React.FunctionComponent<Properties> = ({
    contacts,
    onCreateContactClickListener,
    onDeleteContactClickListener,
}) => {

    const classes = useStyles(theme);

    const [isShowingContactModal, setIsShowingContactModal] = React.useState<boolean>(false);

    function closeCreateModalDialog () {
        setIsShowingContactModal(false);
    }

    function onAddContactClickListener() {
        setIsShowingContactModal(true);
    }

    function internalOnCreateContactClickListener(contact: Contact) {
        setIsShowingContactModal(false);
        onCreateContactClickListener(contact);
    }

    return (
        <Paper>
            <SupplierContactsTable 
                contacts={contacts} 
                canDeleteContact
                onDeleteContactClickListener={onDeleteContactClickListener}
                onContactClickListener={() => {}}
            />
            <Button 
                variant='contained' 
                className={classes.addButton}
                onClick={onAddContactClickListener}
            >
                Agregar nuevo Contacto
            </Button>
            <CreateContactDialog 
                isOpen={isShowingContactModal} 
                onCloseModalClickListener={closeCreateModalDialog}
                onCreateContactClickListener={internalOnCreateContactClickListener}
            />
        </Paper>
    );
};