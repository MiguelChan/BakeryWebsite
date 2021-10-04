import { 
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import React from 'react';
import { 
    Contact,
    ContactType,
} from '../../../Models';
import {
    isNullOrEmpty,
    isNullOrUndefined,
} from '../../../Utils';

export interface ViewContactDialogProps {
    contact: Contact;
    onCloseDialog: () => void;
}

/**
 * Simple dialog for displaying a Contact's Information.
 * 
 * @param {Contact} contact .
 * @param {() => void} onCloseDialog .
 * 
 * @returns .
 */
export const ViewContactDialog: React.FunctionComponent<ViewContactDialogProps> = ({
    contact,
    onCloseDialog,
}) => {

    const [currentContact, setCurrentContact] = React.useState<Contact>(contact);

    React.useEffect(() => {
        setCurrentContact(contact);
    }, [contact]);

    if (isNullOrUndefined(currentContact)) {
        return <></>;
    }

    function renderTextField(valueToRender: string, label: string) {
        return (
            <Grid item xs={6}>
                <TextField 
                    variant='standard'
                    disabled
                    value={isNullOrEmpty(valueToRender) ? 'N/A' : valueToRender}
                    aria-label={label}
                    label={label}
                    fullWidth
                />
            </Grid>
        );
    }

    function renderContactType() {
        const {
            contactType,
        } = currentContact;

        return (
            <Grid item xs={6}>
                <FormControl 
                    component='fieldset'
                    variant='standard'
                >
                    <FormLabel component='legend' aria-label='Tipo de Contacto'>Tipo de Contacto</FormLabel>
                    <RadioGroup defaultValue={contactType}>
                        <FormControlLabel value={ContactType.Returns} control={<Radio disabled />} label='Devoluciones' />
                        <FormControlLabel value={ContactType.SalesRep} control={<Radio disabled />} label='Representante de Ventas' />
                    </RadioGroup>
                </FormControl>
            </Grid>
        );
    }

    function renderCloseButton() {
        return (
            <Grid item xs={6}>
                <Button color='primary' onClick={onCloseDialog}>
                    Cerrar
                </Button>
            </Grid>
        );
    }

    return (
        <Dialog open onClose={onCloseDialog}>
            <DialogTitle>Informacion de Contacto</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {renderTextField(currentContact.firstName, 'Nombre(s)')}
                    {renderTextField(currentContact.lastName, 'Apellido(s)')}
                    {renderTextField(currentContact.phoneNumber, 'Numero Telefonico')}
                    {renderTextField(currentContact.emailAddress, 'Correo Electronico')}
                    {renderContactType()}
                </Grid>
                <Grid container spacing={2}>
                    {renderCloseButton()}
                </Grid>
            </DialogContent>
        </Dialog>
    );

};