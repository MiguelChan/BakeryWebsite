import { 
    Button,
    Container,
    Paper,
    Typography, 
} from '@material-ui/core';
import * as React from 'react';
import { 
    Contact,
    Supplier,
} from '../../../Models';
import { 
    BasicDialog, 
    DialogProperties,
    LoadingDialog,
} from '../../Blocks';
import { 
    EditableSupplierContactsTable, 
    EditableSupplierForm,
} from '..';
import { isNullOrUndefined } from '../../../Utils';

export type OnEditSupplierClickedListener = (supplier: Supplier, contacts: Contact[]) => void;

interface Properties {
    supplier?: Supplier;
    isPerformingAsyncOperation: boolean;
    errorMessage?: string;
    buttonMessage?: string;
    dialogActionMessage?: string;
    onEditSupplierClickedListener: OnEditSupplierClickedListener;
}

/**
 * Defined the Supplier Editable View.
 * @param props .
 */
export const SupplierEditableView: React.FunctionComponent<Properties> = ({
    supplier,
    isPerformingAsyncOperation,
    errorMessage,
    buttonMessage = 'Crear Proveedor',
    dialogActionMessage = 'Se creara el Proveedor. Desea continuar?',
    onEditSupplierClickedListener,
}) => {

    const [activeSupplier, setActiveSupplier] = React.useState<Supplier>({
        addressLine1: '',
        addressLine2: '',
        contacts: [],
        id: '',
        name: '',
        phoneNumber: '',
    });

    const [currentContacts, setCurrentContacts] = React.useState<Contact[]>([]);
    const [isShowingModal, setIsShowingModal] = React.useState<boolean>(false);
    const [dialogProperties, setDialogProperties] = React.useState<DialogProperties>({
        dialogContent: '',
        dialogTitle: '',
    });

    React.useEffect(() => {
        if (!isNullOrUndefined(supplier)) {
            setCurrentContacts(supplier!.contacts)
            setActiveSupplier(supplier!);
        }
    }, [supplier]);

    function onSupplierChangedListener(newSupplier: Supplier) {
        setActiveSupplier(newSupplier);
    }

    function onCreateContactClickListener(contact: Contact) {
        const updatedContacts: Contact[] = [
            ...currentContacts,
            contact,
        ];
        setCurrentContacts(updatedContacts);
    }

    function onDeleteContactClickListener(contact: Contact, contactIndex: number) {
        const updatedContacts: Contact[] = [
            ...currentContacts,
        ];
        updatedContacts.splice(contactIndex, 1);
        setCurrentContacts(updatedContacts);
    }

    function onCreateSupplierClickListener() {
        if (isInvalidSupplier()) {
            setDialogProperties({
                dialogContent: 'Se requiere el nombre y telefono del proveedor',
                dialogTitle: 'Atributos Requeridos',
            });
            setIsShowingModal(true);
            return;
        }

        if (currentContacts.length === 0) {
            setDialogProperties({
                dialogContent: 'No se han agregado contactos. Desea continuar?',
                dialogTitle: 'Contactos no agregados'
            });
            setIsShowingModal(true);
            return;
        }

        setDialogProperties({
            dialogTitle: 'Confirmar',
            dialogContent: dialogActionMessage,
        });
        setIsShowingModal(true);
    }

    function createSupplier() {
        if (isInvalidSupplier()) {
            setIsShowingModal(false);
            return;
        }

        setIsShowingModal(false);

        onEditSupplierClickedListener(activeSupplier, currentContacts);
    }

    function isInvalidSupplier(): boolean {
        return activeSupplier.name === '' || activeSupplier.phoneNumber === '';
    }
    
    function renderCreateError() {
        if (!isNullOrUndefined(errorMessage) && errorMessage !== '') {
            return (
                <Paper>
                    <Typography>{errorMessage}</Typography>
                </Paper>
            );
        }
        return <></>;
    }

    return (
        <Container>
            <Paper>
                <EditableSupplierForm 
                    onSupplierChangedListener={onSupplierChangedListener} 
                    supplier={activeSupplier}
                />
                <EditableSupplierContactsTable 
                    onCreateContactClickListener={onCreateContactClickListener}
                    onDeleteContactClickListener={onDeleteContactClickListener}
                    contacts={currentContacts}
                />
                {renderCreateError()}
                <BasicDialog 
                    dialogProperties={dialogProperties!}
                    isOpen={isShowingModal}
                    onCloseClickedListener={() => setIsShowingModal(false)}
                    onAcceptClickListener={createSupplier}
                />
                <LoadingDialog isOpen={isPerformingAsyncOperation} />
                <Button color='primary' variant='contained' onClick={onCreateSupplierClickListener}>
                    {buttonMessage}
                </Button>
            </Paper>
        </Container>
    );

};