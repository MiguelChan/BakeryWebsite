import * as React from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup, 
    TextField, 
} from '@material-ui/core';
import { 
    Contact, 
    ContactType,
} from '../../../Models';
import { 
    OnButtonClickListener,
} from '../BasicDialog/BasicDialog';

export type OnCreateContactClickListener = (contact: Contact) => void;

interface Properties {
    onCreateContactClickListener: OnCreateContactClickListener;
    onCloseModalClickListener: OnButtonClickListener;
    isOpen: boolean;
}

/**
 * Defines the Create Contact Dialog.
 * @param {OnCreateContactClickListener} onCreateContactClickListener Called whenever a Contact Creation takes place.
 * @param {OnButtonClickListener} onCloseModalClickListener Called whenever the Dialog is closed.
 * @param {boolean} isOpen Whether the modal is open or not.
 * @returns 
 */
export const CreateContactDialog: React.FunctionComponent<Properties> = ({
    onCreateContactClickListener,
    onCloseModalClickListener,
    isOpen,
}) => {

    const [contact, setContact] = React.useState<Contact>({
        contactType: ContactType.Returns,
        firstName: '',
        lastName: '',
        emailAddress: '',
        id: '',
        phoneNumber: '',
    });

    const [hasValidationError, setHasValidationError] = React.useState<boolean>(false);

    function resetContact() {
        setContact({
            contactType: ContactType.Returns,
            firstName: '',
            lastName: '',
            emailAddress: '',
            id: '',
            phoneNumber: '',
        });
    }

    function internalOnCloseModalClickListener() {
        resetContact();
        onCloseModalClickListener();
    }

    function internalOnCreateClickListener() {
        if (contact?.firstName === '' || contact?.lastName === '') {
            setHasValidationError(true);
            return;
        }

        resetContact();
        onCreateContactClickListener(contact);
    }

    function onPhoneNumberChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        setContact({
            ...contact,
            phoneNumber: event.target.value,
        });
    }

    function onEmailAddressChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        setContact({
            ...contact,
            emailAddress: event.target.value,
        });
    }

    function onFirstNameChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        setContact({
            ...contact,
            firstName: event.target.value,
        });
    }

    function onLastNameChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        setContact({
            ...contact,
            lastName: event.target.value,
        });
    }

    function onContactTypeChangedListener(event: React.ChangeEvent<HTMLInputElement>) {
        setContact({
            ...contact,
            contactType: event.target.value as ContactType,
        });
    }

    return (
        <Dialog open={isOpen} onClose={internalOnCloseModalClickListener}>
            <DialogTitle>Crear Contacto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para la creacion de un Contacto, se requiere la informacion que se solicita abajo.
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            autoFocus
                            margin='dense'
                            label='Nombre(s)'
                            aria-label='Nombre(s)'
                            type='text'
                            fullWidth
                            onChange={onFirstNameChangedListener}
                            required
                            error={hasValidationError && contact?.firstName === ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            autoFocus
                            margin='dense'
                            label='Apellido(s)'
                            aria-label='Apellido(s)'
                            type='text'
                            fullWidth
                            onChange={onLastNameChangedListener}
                            required
                            error={hasValidationError && contact?.lastName === ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            autoFocus
                            margin='dense'
                            label='Numero Telefonico'
                            type='phonenumber'
                            aria-label='Numero Telefonico'
                            fullWidth
                            onChange={onPhoneNumberChangedListener}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            autoFocus
                            margin='dense'
                            label='Correo Electronico'
                            type='email'
                            aria-label='Correo Electronico'
                            fullWidth
                            onChange={onEmailAddressChangedListener}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl component='fieldset'>
                            <FormLabel component='legend' aria-label='Tipo de Contacto'>Tipo de Contacto</FormLabel>
                            <RadioGroup defaultValue={ContactType.Returns} onChange={onContactTypeChangedListener}>
                                <FormControlLabel value={ContactType.Returns} control={<Radio />} label='Devoluciones'/>
                                <FormControlLabel value={ContactType.SalesRep} control={<Radio />} label='Representante de Ventas'/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={internalOnCloseModalClickListener} 
                    color='primary'
                    aria-label='Cancelar'
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={internalOnCreateClickListener} 
                    color='primary'
                    aria-label='Crear Contacto'
                >
                    Crear Contacto
                </Button>
            </DialogActions>
        </Dialog>
    );

};