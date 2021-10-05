import { Container,
Fab,
Paper } from '@mui/material';
import * as React from 'react';
import { 
    Contact,
    Supplier,
} from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';
import { BasicSupplierDetails,
OnButtonClickListener,
SupplierContactsTable,
ViewContactDialog } from '../../Blocks';

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

    const [clickedContact, setClickedContact] = React.useState<Contact>();

    function renderContactDialog() {
        if (isNullOrUndefined(clickedContact)) {
            return <></>;
        }

        const onCloseDialog = () => setClickedContact(undefined);

        return <ViewContactDialog contact={clickedContact!} onCloseDialog={onCloseDialog} />;
    }

    const onContactClickListener = (contact: Contact) => setClickedContact(contact);

    return (
        <Container>
            {renderContactDialog()}
            <BasicSupplierDetails 
                supplier={supplier}
            />
            <Paper>
                <SupplierContactsTable 
                    canDeleteContact={false}
                    contacts={supplier.contacts ?? []}
                    onDeleteContactClickListener={() => {}}
                    onContactClickListener={onContactClickListener}
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