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

export type OnDeleteContactClickListener = (contact: Contact, contactIndex: number) => void;
export type OnContactClickListener = (contact: Contact) => void;

interface Properties {
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
export const SupplierContactsTable: React.FunctionComponent<Properties> = ({
    contacts,
    canDeleteContact,
    onDeleteContactClickListener,
    onContactClickListener,
}) => {

    function renderContactRow(contactIndex: number, contact: Contact) {
        return (
            <TableRow 
                key={`${contact.firstName}-${contact.lastName}`} 
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
                            aria-label={`delete-${contactIndex}`}
                            onClick={() => onDeleteContactClickListener(contact, contactIndex - 1)}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                }
            </TableRow>
        );
    }

    function renderContacts() {
        return contacts.map((currentContact: Contact, index: number) => {
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