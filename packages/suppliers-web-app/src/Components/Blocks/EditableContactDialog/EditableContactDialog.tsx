import React from 'react';
import { Contact,
ContactType } from '../../../Models';
import { OnButtonClickListener } from '../BasicDialog';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { 
    isNullOrEmpty,
} from '../../../Utils';

export type OnEditContactClickListener = (updatedContact: Contact) => void;

export interface EditableContactDialogProps {
    contact: Contact;
    isDialogOpen: boolean;
    onCloseDialogClickListener: OnButtonClickListener;
    onEditContactClickListener: OnEditContactClickListener;
    errorMessage: string;
}

export const EditableContactDialog: React.FunctionComponent<EditableContactDialogProps> = ({
    contact,
    isDialogOpen,
    onCloseDialogClickListener,
    onEditContactClickListener,
    errorMessage,
}) => {

    const [currentContact, setCurrentContact] = React.useState<Contact>(contact);
    const [validationErrors, setValidationErrors] = React.useState<Set<string>>(new Set<string>());

    React.useEffect(() => {
        setCurrentContact(contact);
    }, [contact]);

    const getContactName = (): string => (
        `${currentContact.firstName} ${currentContact.lastName}`
    );

    const renderCloseButton = (): React.ReactElement => (
        <Button color='primary' onClick={onCloseDialogClickListener}>
            Cerrar
        </Button>
    );

    const renderSaveContactButton = (): React.ReactElement => {
        const onSaveContactClickListener = (): void => {
            onEditContactClickListener(currentContact);
        };

        return (
            <Button color='secondary' onClick={onSaveContactClickListener} disabled={validationErrors.size > 0}>
                Actualizar contacto
            </Button>
        );
    }

    const renderTextField = (fieldName: string, label: string, type: string, isRequired: boolean = false): React.ReactElement => {
        const onTextChangedListener = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const newValue = event.target.value;

            const updatedContact: Contact = {
                ...currentContact,
            };
            updatedContact[fieldName] = newValue;
            setCurrentContact(updatedContact);

            if (isRequired) {
                const updatedErrors: Set<string> = new Set<string>(validationErrors);
                if (isNullOrEmpty(newValue)) {
                    updatedErrors.add(fieldName);
                } else {
                    updatedErrors.delete(fieldName);
                }
                setValidationErrors(updatedErrors);
            }
        };

        const currentValue = currentContact[fieldName] ?? 'N/A';

        return (
            <Grid item xs={6}>
                <TextField
                    value={currentValue}
                    variant='standard'
                    aria-label={label}
                    label={label}
                    fullWidth
                    onChange={onTextChangedListener}
                    type={type}
                    required={isRequired}
                    error={validationErrors.has(fieldName)}
                />
            </Grid>
        );
    };

    const renderContactType = (): React.ReactElement => {
        const {
            contactType,
        } = currentContact;
        
        const onContactTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
            const updatedContact = {
                ...currentContact,
                contactType: event.target.value as ContactType,
            };
            setCurrentContact(updatedContact);
        }

        return (
            <Grid item xs={6}>
                <FormControl 
                    component='fieldset'
                    variant='standard'
                >
                    <FormLabel component='legend' aria-label='Tipo de Contacto'>Tipo de Contacto</FormLabel>
                    <RadioGroup value={contactType} onChange={onContactTypeChanged}>
                        <FormControlLabel value={ContactType.Returns} control={<Radio />} label='Devoluciones'/>
                        <FormControlLabel value={ContactType.SalesRep} control={<Radio />} label='Representante de Ventas' />
                    </RadioGroup>
                </FormControl>
            </Grid>
        );
    };

    const renderErrorMessage = (): React.ReactElement => (
        <Grid item xs={6}>
            {!isNullOrEmpty(errorMessage) && <Typography>{errorMessage}</Typography>}
        </Grid>
    );

    return (
        <Dialog open={isDialogOpen} onClose={onCloseDialogClickListener}>
            <DialogTitle>Editando contacto: {getContactName()}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {renderTextField('firstName', 'Nombre(s)', 'text', true)}
                    {renderTextField('lastName', 'Apellido(s)', 'text')}
                    {renderTextField('phoneNumber', 'Numero Telefonico', 'tel', true)}
                    {renderTextField('emailAddress', 'Correo Electronico', 'email')}
                    {renderContactType()}
                </Grid>
                <Grid container spacing={2}>
                    {renderErrorMessage()}
                </Grid>
            </DialogContent>
            <DialogActions>
                {renderCloseButton()}
                {renderSaveContactButton()}
            </DialogActions>
        </Dialog>
    );

};