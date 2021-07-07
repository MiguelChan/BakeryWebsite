import * as React from 'react';
import { 
    Button,
    makeStyles,
    Paper,
} from '@material-ui/core';
import { 
    Contact,
} from '../../../Models';
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

export interface EditableSupplierContactsTableProps {
    contacts: Contact[];
    onCreateContactClickListener: OnCreateContactClickListener;
    onDeleteContactClickListener: OnDeleteContactClickListener;
}

/**
 * Defines the Editable Contacts Table for the Supplier.
 * @param 
 * @returns The Editable SupplierContactsTable.
 */
export const EditableSupplierContactsTable: React.FunctionComponent<EditableSupplierContactsTableProps> = ({
    contacts,
    onCreateContactClickListener,
    onDeleteContactClickListener,
}) => {

    const classes = useStyles();

    const [isShowingContactModal, setIsShowingContactModal] = React.useState<boolean>(false);
    const [currentContacts, setCurrentContacts] = React.useState<Contact[]>(contacts);

    React.useEffect(() => {
        setCurrentContacts(contacts);
    }, [contacts]);

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
                contacts={currentContacts} 
                canDeleteContact
                onDeleteContactClickListener={onDeleteContactClickListener}
                onContactClickListener={() => {}}
            />
            {false && <Button 
                variant='contained' 
                className={classes.addButton}
                onClick={onAddContactClickListener}
            >
                Agregar nuevo Contacto
            </Button>}
            <CreateContactDialog 
                isOpen={isShowingContactModal} 
                onCloseModalClickListener={closeCreateModalDialog}
                onCreateContactClickListener={internalOnCreateContactClickListener}
            />
        </Paper>
    );
};