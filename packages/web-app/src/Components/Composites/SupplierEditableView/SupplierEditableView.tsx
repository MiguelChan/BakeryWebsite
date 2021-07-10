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
    OnContactClickListener,
} from '../../Blocks';
import { 
    EditableSupplierContactsTable, 
    EditableSupplierForm,
} from '..';
import { isNullOrUndefined } from '../../../Utils';

export type OnEditSupplierClickedListener = (supplier: Supplier, contacts: Contact[]) => void;
export type OnDeleteContactClickedListener = (contact: Contact) => void;
export type OnDeleteSupplierClickedListener = (supplier: Supplier) => void;

interface Properties {
    supplier?: Supplier;
    isPerformingAsyncOperation: boolean;
    errorMessage?: string;
    buttonMessage?: string;
    dialogActionMessage?: string;
    onEditSupplierClickedListener: OnEditSupplierClickedListener;
    onDeleteContactClickedListener: OnDeleteContactClickedListener;
    onDeleteSupplierClickedListener?: OnDeleteSupplierClickedListener;
    onContactClickListener: OnContactClickListener;
    onContactAddedListener?: (contact: Contact) => void;
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
    onDeleteContactClickedListener,
    onDeleteSupplierClickedListener,
    onContactClickListener,
    onContactAddedListener,
}) => {

    const [activeSupplier, setActiveSupplier] = React.useState<Supplier>({
        lineAddress1: '',
        lineAddress2: '',
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
    const [isDeleteSupplierDialogOpen, setDeleteSupplierDialogOpen] = React.useState<boolean>(false);

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
        if (!isNullOrUndefined(onContactAddedListener)) {
            onContactAddedListener!(contact);
        }
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

    const renderDeleteSupplierDialog = (): React.ReactElement => {
        const dialogProperties: DialogProperties = {
            dialogTitle: `Eliminar proveedor: ${activeSupplier.name}`,
            dialogContent: 'El proveedor se eliminara permanentemente. Desea continuar?',
        };

        const internalOnDeleteClickListener = (): void => {
            onDeleteSupplierClickedListener!(activeSupplier);
            setDeleteSupplierDialogOpen(false);
        };

        const dismissDeleteSupplierDialog = (): void => {
            setDeleteSupplierDialogOpen(false);
        };

        return (
            <BasicDialog 
                dialogProperties={dialogProperties}
                isOpen={isDeleteSupplierDialogOpen}
                onAcceptClickListener={internalOnDeleteClickListener}
                onCloseClickedListener={dismissDeleteSupplierDialog}
            />
        );
    };

    return (
        <Container>
            <Paper>
                <EditableSupplierForm 
                    onSupplierChangedListener={onSupplierChangedListener} 
                    supplier={activeSupplier}
                />
                <EditableSupplierContactsTable 
                    onCreateContactClickListener={onCreateContactClickListener}
                    onDeleteContactClickListener={onDeleteContactClickedListener}
                    onContactClickListener={onContactClickListener}
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
                {renderDeleteSupplierDialog()}
                {!isNullOrUndefined(onDeleteSupplierClickedListener) &&
                    <Button color='secondary' variant='contained' onClick={(): void => setDeleteSupplierDialogOpen(true)}>
                        Eliminar Proveedor
                    </Button>
                }
            </Paper>
        </Container>
    );

};