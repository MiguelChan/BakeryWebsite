import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { DeleteContactResponse, DeleteSupplierResponse, EditSupplierResponse, GetSupplierResponse, suppliersClient } from '../../../Clients';
import { Contact, Supplier } from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';
import { BasicDialog, CustomLink, DialogProperties, LoadingDialog } from '../../Blocks';
import { SupplierEditableView } from '../../Composites';

interface RouteProperties {
    supplierId: string;
}

interface SupplierDataHolder {
    supplier: Supplier;
    contacts: Contact[];
}

export const EditSupplierView: React.FunctionComponent<RouteComponentProps<RouteProperties>> = ({
    match,
}) => {

    const matchParams: RouteProperties = match.params;
    const location = useLocation<Supplier>();
    const history = useHistory();
    const [currentSupplier, setCurrentSupplier] = React.useState<Supplier>();
    const [errorMessage, setErrorMessage] = React.useState<string>();
    const [supplierDataHolder, setSupplierDataHolder] = React.useState<SupplierDataHolder>();
    const [isEditingSupplier, setIsEditingSupplier] = React.useState<boolean>(false);
    const [loadSupplier, setLoadSupplier] = React.useState<boolean>(false);

    const loadSupplierFromServer = React.useCallback(() => {
        suppliersClient.getSupplier(matchParams.supplierId).then((getSupplierResponse: GetSupplierResponse) => {
            setCurrentSupplier(getSupplierResponse.supplier);
        }).catch((errorResponse: GetSupplierResponse) => {
            setErrorMessage(errorResponse.errorMessage);
        }).finally(() => {
            setLoadSupplier(false);
        });
    }, [matchParams.supplierId]);

    React.useEffect(() => {
        if (loadSupplier) {
            loadSupplierFromServer();
        }
    }, [loadSupplier, loadSupplierFromServer]);

    React.useEffect(() => {
        const supplier = location.state;
        if (!isNullOrUndefined(supplier)) {
            setCurrentSupplier(supplier);
            return;
        }
        loadSupplierFromServer();
    }, [location, matchParams, loadSupplierFromServer]);

    // For deleting a Contact
    const [isDeletingContact, setIsDeletingContact] = React.useState<boolean>(false);
    const [contactToDelete, setContactToDelete] = React.useState<Contact>();
    const [deleteContact, setDeleteContact] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (deleteContact) {
            const {
                id: supplierId,
            } = currentSupplier!;

            const {
                id: contactId,
            } = contactToDelete!;

            suppliersClient.deleteContact(supplierId, contactId).then((response: DeleteContactResponse) => {
                setLoadSupplier(true);
            }).catch((error: any) => {
                setErrorMessage(JSON.stringify(error));
            }).finally(() => {
                setDeleteContact(false);
                setIsDeletingContact(false);
                setContactToDelete(undefined);
            });
        }
    }, [deleteContact, contactToDelete, currentSupplier]);

    // For deleting a Supplier
    const [supplierToDelete, setSupplierToDelete] = React.useState<Supplier>();
    const [deleteSupplier, setDeleteSupplier] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (deleteSupplier && !isNullOrUndefined(supplierToDelete)) {
            suppliersClient.deleteSupplier(supplierToDelete!.id).then((response: DeleteSupplierResponse) => {
                history.replace('/suppliers');
            }).catch((error: any) => {
                setErrorMessage(JSON.stringify(error));
            });
        }
    }, [supplierToDelete, deleteSupplier, history]);

    React.useEffect(() => {
        if (!isEditingSupplier) {
            return;
        }

        const {
            supplier,
            contacts,
        } = supplierDataHolder!;

        suppliersClient.editSupplier(supplier, contacts).then(() => {
            history.push('/suppliers');
        }).catch((error: EditSupplierResponse) => {
            setErrorMessage(error.errorMessage);
        }).finally(() => {
            setIsEditingSupplier(false);
        });
    }, [isEditingSupplier, supplierDataHolder, history]);

    function onEditSupplierClickedListener(supplier: Supplier, contacts: Contact[]) {
        setSupplierDataHolder({
            contacts,
            supplier,
        });
        setIsEditingSupplier(true);
    }

    const onDeleteContactClickedListener = (contact: Contact) => {
        setIsDeletingContact(true);
        setContactToDelete(contact);
    };

    const renderDeleteContactDialog = (): React.ReactElement => {
        const dialogProperties: DialogProperties = {
            dialogContent: 'El contacto se eliminara para siempre. Desea continuar?',
            dialogTitle: `Eliminar Contacto: ${contactToDelete?.firstName} ${contactToDelete?.lastName}`
        };

        const onCloseDialogClickListener = (): void => {
            setIsDeletingContact(false);
            setContactToDelete(undefined);
        };

        const onAcceptContactDeletion = (): void => {
            setDeleteContact(true);
        };

        return (
            <BasicDialog 
                isOpen={isDeletingContact} 
                dialogProperties={dialogProperties}
                onAcceptClickListener={onAcceptContactDeletion}
                onCloseClickedListener={onCloseDialogClickListener}
            />
        );
    };

    const renderLoadingDialog = (): React.ReactElement => {
        return (
            <LoadingDialog 
                isOpen={deleteContact || deleteSupplier}
            />
        );
    };

    const onDeleteSupplierClickedListener = (supplier: Supplier): void => {
        setSupplierToDelete(supplier);
        setDeleteSupplier(true);
    };

    return (
        <>
            <CustomLink linkText='Volver a Vista de Proveedor' to={`/suppliers/${currentSupplier?.id}`} />
            {!isNullOrUndefined(currentSupplier) &&
            <SupplierEditableView 
                onEditSupplierClickedListener={onEditSupplierClickedListener}
                isPerformingAsyncOperation={isNullOrUndefined(currentSupplier) || isEditingSupplier}
                errorMessage={errorMessage}
                supplier={currentSupplier}
                dialogActionMessage='Se editara el proveedor. Desea continuar?'
                buttonMessage='Editar proveedor'
                onDeleteContactClickedListener={onDeleteContactClickedListener}
                onDeleteSupplierClickedListener={onDeleteSupplierClickedListener}
            />}
            {renderDeleteContactDialog()}
            {renderLoadingDialog()}
        </>
    );
};