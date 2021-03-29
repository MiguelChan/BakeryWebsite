import { 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
} from '@material-ui/core';
import * as React from 'react';
import { 
    Contact,
} from '../../../Models';

interface Properties {
    contacts: Contact[];
}

/**
 * Renders the Contacts Table.
 * @param contacts The contacts.
 * @returns 
 */
export const SupplierContactsTable: React.FunctionComponent<Properties> = ({
    contacts,
}) => {

    function renderContactRow(contactIndex: number, contact: Contact) {
        return (
            <TableRow key={contact.contactFirstName}>
                <TableCell>
                    {contactIndex}
                </TableCell>
                <TableCell>
                    {`${contact.contactFirstName} ${contact.contactLastName}`}
                </TableCell>
                <TableCell>
                    {`${contact.emailAddress}`}
                </TableCell>
                <TableCell>
                    {`${contact.phoneNumber}`}
                </TableCell>
                <TableCell>
                    {`${contact.contactType}`}
                </TableCell>
            </TableRow>
        );
    }

    function renderContacts() {
        return contacts.map((currentContact: Contact, index: number) => renderContactRow(index, currentContact));
    }

    return (
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
                </TableRow>
            </TableHead>   
            <TableBody>
                {renderContacts()}
            </TableBody>             
        </Table>
    );

};