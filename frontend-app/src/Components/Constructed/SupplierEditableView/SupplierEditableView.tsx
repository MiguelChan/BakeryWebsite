import { 
    Button,
    Paper,
    Typography, 
} from '@material-ui/core';
import * as React from 'react';
import { 
    useHistory,
} from 'react-router-dom';
import { 
    CreateSupplierResponse, 
    suppliersClient,
} from '../../../Clients';
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
} from '../../Composites';

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
    const [isCreatingSupplier, setIsCreatingSupplier] = React.useState<boolean>(false);
    const [createError, setCreateError] = React.useState<string>('');

    const history = useHistory();

    React.useEffect(() => {
        if (!isCreatingSupplier) {
            return;
        }

        suppliersClient.createSupplier(activeSupplier, currentContacts)
            .then((createSupplierResponse: CreateSupplierResponse) => {
                history.push({
                    pathname: '/suppliers'
                });
            }).catch((createSupplierResponse: CreateSupplierResponse) => {
                setCreateError(createSupplierResponse.errorMessage!);
            }).finally(() => {
                setIsCreatingSupplier(false);
            });
    }, [isCreatingSupplier]);

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
                dialogContent: 'Se require el nombre y direccion del proveedor',
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
            dialogContent: 'Se creara el Proveedor. Desea continuar?'
        });
        setIsShowingModal(true);
    }

    function createSupplier() {
        if (isInvalidSupplier()) {
            setIsShowingModal(false);
            return;
        }

        setIsShowingModal(false);
        setIsCreatingSupplier(true);
    }

    function isInvalidSupplier(): boolean {
        return activeSupplier.name === '' || activeSupplier.addressLine1 === '';
    }
    
    function renderCreateError() {
        if (createError !== '') {
            return (
                <Paper>
                    <Typography>{createError}</Typography>
                </Paper>
            );
        }
        return <></>;
    }

    return (
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
            <LoadingDialog isOpen={isCreatingSupplier} />
            <Button color='primary' variant='contained' onClick={onCreateSupplierClickListener}>
                Crear Proveedor
            </Button>
        </Paper>
    );

};