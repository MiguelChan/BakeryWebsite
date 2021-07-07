import { 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
    IconButton,
    Grid,
} from '@material-ui/core';
import { 
    Delete,
} from '@material-ui/icons';
import * as React from 'react';
import { 
    Contact, contactTypeParser,
} from '../../../Models';
import { isNullOrEmpty, isNullOrUndefined } from '../../../Utils';

export type OnDeleteContactClickListener = (contact: Contact, contactIndex: number) => void;
export type OnContactClickListener = (contact: Contact) => void;

export interface SupplierContactsTableProps {
    contacts: Contact[];
    canDeleteContact: boolean;
    onContactClickListener: OnContactClickListener;
    onDeleteContactClickListener: OnDeleteContactClickListener;
}

/**
 * Renders the Contacts Table.
 * @param contacts The contacts.
 * @returns 
 */
export const SupplierContactsTable: React.FunctionComponent<SupplierContactsTableProps> = ({
    contacts,
    canDeleteContact,
    onDeleteContactClickListener,
    onContactClickListener,
}) => {

    const [currentContacts, setCurrentContacts] = React.useState<Contact[]>(contacts);

    React.useEffect(() => {
        setCurrentContacts(contacts);
    }, [contacts]);

    function internalOnDeleteContact(event: React.MouseEvent<HTMLButtonElement>, contact: Contact, index: number) {
        event.stopPropagation();
        onDeleteContactClickListener(contact, index);
    }

    const getContactKey = (contact: Contact): string => {
        if (isNullOrEmpty(contact.id)) {
            return `${contact.firstName}-${contact.lastName}-${contact.contactType}`;
        }

        return contact.id;
    };

    function renderContactRow(contactIndex: number, contact: Contact) {
        return (
            <TableRow 
                key={getContactKey(contact)} 
                hover 
                onClick={() => onContactClickListener(contact)}
            >
                <TableCell>
                    {contactIndex}
                </TableCell>
                <TableCell>
                    {`${contact.firstName} ${contact.lastName}`}
                </TableCell>
                <TableCell>
                    {`${contact.emailAddress}`}
                </TableCell>
                <TableCell>
                    {`${contact.phoneNumber}`}
                </TableCell>
                <TableCell>
                    {`${contactTypeParser(contact.contactType)}`}
                </TableCell>
                {canDeleteContact &&
                    <TableCell>
                        <IconButton 
                            aria-label='Delete Contact'
                            onClick={(event): void => internalOnDeleteContact(event, contact, contactIndex - 1)}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                }
            </TableRow>
        );
    }

    function renderContacts() {
        if (isNullOrUndefined(currentContacts)) {
            return <></>;
        }

        return currentContacts.map((currentContact: Contact, index: number) => {
            return renderContactRow(index + 1, currentContact);
        });
    }

    return (
        <Grid item xs={12}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            #
                        </TableCell>
                        <TableCell>
                            Nombre completo
                        </TableCell>
                        <TableCell>
                            Correo Electronico
                        </TableCell>
                        <TableCell>
                            Numero de Telefono
                        </TableCell>
                        <TableCell>
                            Tipo
                        </TableCell>
                        {canDeleteContact &&
                            <TableCell>
                                <IconButton />
                            </TableCell>
                        }
                    </TableRow>
                </TableHead>   
                <TableBody>
                    {renderContacts()}
                </TableBody>             
            </Table>
        </Grid>
    );

};