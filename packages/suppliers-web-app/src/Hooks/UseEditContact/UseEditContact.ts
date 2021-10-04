import React from "react";
import { suppliersClient } from "../../Clients";
import { EditContactResponse } from "../../Clients/SuppliersClient/Responses/EditContactResponse";
import { OnButtonClickListener,
OnContactClickListener } from "../../Components/Blocks";
import { OnEditContactClickListener } from "../../Components/Blocks/EditableContactDialog";
import { Contact,
ContactType } from "../../Models";
import { isNullOrEmpty } from "../../Utils";

export interface UseEditContactState {
    setContact: OnContactClickListener;
    shouldDisplayDialog: boolean;
    isUpdatingContact: boolean;
    contact: Contact;
    onCloseDialogClickListener: OnButtonClickListener;
    onEditContactClickListener: OnEditContactClickListener;
    setSupplierId: (supplierId: string) => void;
    errorMessage: string;
    isSuccess: boolean;
    resetState: () => void;
    currentContact: Contact;
}

export function useEditContact(): UseEditContactState {

    const emptyContact: Contact = {
        contactType: ContactType.Returns,
        emailAddress: '',
        firstName: '',
        id: '',
        lastName: '',
        phoneNumber: '',
    };

    const [shouldDisplayDialog, setShouldDisplayDialog] = React.useState<boolean>(false);
    const [isUpdatingContact, setIsUpdatingContact] = React.useState<boolean>(false);
    const [editContact, setEditContact] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    const [currentContact, setCurrentContact] = React.useState<Contact>(emptyContact);
    const [dirtyContact, setDirtyContact] = React.useState<Contact>();
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [currentSupplierId, setCurrentSupplierId,] = React.useState<string>();
    

    React.useEffect(() => {
        if (editContact) {
            setIsUpdatingContact(true);
            if (isNullOrEmpty(dirtyContact!.id)) {
                // We're editing a Contact that has not been created yet.
                setShouldDisplayDialog(false);
                setIsSuccess(true);
                setEditContact(false);
                setIsUpdatingContact(false);
                return;
            }

            suppliersClient.editContact(currentSupplierId!, dirtyContact!).then((response: EditContactResponse) => {
                setErrorMessage(response.message);
                if (response.success) {
                    setShouldDisplayDialog(false);
                    setIsSuccess(true);
                } else {
                    setIsSuccess(false);
                }
            }).catch((error: any) => {
                setErrorMessage(JSON.stringify(error));
            }).finally(() => {
                setEditContact(false);
                setIsUpdatingContact(false);
            });
        }
    }, [dirtyContact, editContact, currentSupplierId]);

    const onCloseDialogClickListener = (): void => {
        setShouldDisplayDialog(false);
        resetState();
    };

    const onEditContactClickListener = (updatedContact: Contact): void => {
        setDirtyContact(updatedContact);
        setEditContact(true);
    };

    const setContact = (contact: Contact): void => {
        setCurrentContact(contact);
        setShouldDisplayDialog(true);
    }

    const resetState = (): void => {
        setIsSuccess(false);
        setIsUpdatingContact(false);
        setShouldDisplayDialog(false);
        setEditContact(false);
        setErrorMessage('');
    }

    return {
        setContact,
        isUpdatingContact,
        shouldDisplayDialog: shouldDisplayDialog,
        contact: currentContact,
        onCloseDialogClickListener,
        onEditContactClickListener,
        errorMessage,
        setSupplierId: setCurrentSupplierId,
        isSuccess,
        resetState,
        currentContact: dirtyContact!,
    };

}