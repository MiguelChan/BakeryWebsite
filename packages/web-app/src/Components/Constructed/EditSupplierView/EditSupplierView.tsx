import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { DeleteContactResponse, DeleteSupplierResponse, EditSupplierResponse, GetSupplierResponse, suppliersClient } from '../../../Clients';
import { useEditContact, UseEditContactState } from '../../../Hooks';
import { Contact, Supplier } from '../../../Models';
import { isNullOrEmpty, isNullOrUndefined } from '../../../Utils';
import { BasicDialog, CustomLink, DialogProperties, EditableContactDialog, LoadingDialog } from '../../Blocks';
import { SupplierEditableView } from '../../Composites';

interface RouteProperties {
    supplierId: string;
}

interface SupplierDataHolder {
    supplier: Supplier;
    contacts: Contact[];
}
// ToDo: Add support for Editting Contacts that do not have an ID
// ToDo: Add support for both Edit and Create.
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

    // For editing a Contact
    const useEditContactState: UseEditContactState = useEditContact();

    const loadSupplierFromServer = React.useCallback(() => {
        suppliersClient.getSupplier(matchParams.supplierId).then((getSupplierResponse: GetSupplierResponse) => {
            setCurrentSupplier(getSupplierResponse.supplier);
            useEditContactState.resetState();
        }).catch((errorResponse: GetSupplierResponse) => {
            setErrorMessage(errorResponse.errorMessage);
        }).finally(() => {
            setLoadSupplier(false);
        });
        // eslint-disable-next-line
    }, [matchParams.supplierId]);

    React.useEffect(() => {
        if (loadSupplier) {
            loadSupplierFromServer();
        }
    }, [loadSupplier, loadSupplierFromServer]);

    React.useEffect(() => {
        if (useEditContactState.isSuccess) {
            if (isNullOrEmpty(useEditContactState.currentContact.id)) {
                const currentContactJson = JSON.stringify(useEditContactState.contact);
                const updatedContacts: Contact[] = currentSupplier!.contacts.filter((contact: Contact) => {
                    const jsonContact = JSON.stringify(contact);
                    return jsonContact !== currentContactJson;
                });

                const updatedSupplier: Supplier = {
                    ...currentSupplier!,
                    contacts: [useEditContactState.currentContact, ...updatedContacts],
                };

                setCurrentSupplier(updatedSupplier);
                useEditContactState.resetState();
                return;
            }


            setLoadSupplier(true);
        }
    }, [useEditContactState, currentSupplier]);

    React.useEffect(() => {
        const supplier = location.state;
        if (!isNullOrUndefined(supplier)) {
            setCurrentSupplier(supplier);
            return;
        }
        loadSupplierFromServer();
        useEditContactState.setSupplierId(matchParams.supplierId);
        // eslint-disable-next-line
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

            // Handling the case for deleting non-created Contacts.
            if (isNullOrEmpty(contactId)) {
                const contactJson = JSON.stringify(contactToDelete!);
                const updatedContactList: Contact[] = currentSupplier!.contacts.filter((contact: Contact) => {
                    const currentContactJson = JSON.stringify(contact);
                    console.info('CurrentJson', currentContactJson);
                    console.info(currentContactJson === contactJson);
                    return currentContactJson !== contactJson;
                });
                const updatedSupplier: Supplier = {
                    ...currentSupplier!,
                    contacts: [...updatedContactList],
                }
                setCurrentSupplier(updatedSupplier);
                setDeleteContact(false);
                setIsDeletingContact(false);
                setContactToDelete(undefined);
                return;
            }

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
                isOpen={deleteContact || deleteSupplier || useEditContactState.isUpdatingContact}
            />
        );
    };

    const onDeleteSupplierClickedListener = (supplier: Supplier): void => {
        setSupplierToDelete(supplier);
        setDeleteSupplier(true);
    };

    const onContactAddedListener = (contact: Contact): void => {
        const currentContacts = [...currentSupplier!.contacts];

        const updatedSupplier: Supplier = {
            ...currentSupplier!,
            contacts: [contact, ...currentContacts],
        };
        setCurrentSupplier(updatedSupplier);
    };

    const renderEditContactDialog = (): React.ReactElement => {
        return (
            <EditableContactDialog 
                contact={useEditContactState.contact}
                isDialogOpen={useEditContactState.shouldDisplayDialog}
                onCloseDialogClickListener={useEditContactState.onCloseDialogClickListener}
                onEditContactClickListener={useEditContactState.onEditContactClickListener}
                errorMessage={useEditContactState.errorMessage}
            />
        );
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
                onContactClickListener={useEditContactState.setContact}
                onContactAddedListener={onContactAddedListener}
            />}
            {renderDeleteContactDialog()}
            {renderLoadingDialog()}
            {renderEditContactDialog()}
        </>
    );
};