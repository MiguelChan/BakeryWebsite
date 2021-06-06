import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
} from '@material-ui/core';
import * as React from 'react';

export type OnButtonClickListener = () => void;

export interface DialogProperties {
    dialogTitle: string;
    dialogContent: string;
}

interface Properties {
    onAcceptClickListener: OnButtonClickListener,
    onCloseClickedListener: OnButtonClickListener;
    isOpen: boolean;
    dialogProperties: DialogProperties;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const BasicDialog: React.FunctionComponent<Properties> = ({
    onAcceptClickListener,
    onCloseClickedListener,
    dialogProperties,
    isOpen
}) => {

    const {
        dialogTitle,
        dialogContent,
    } = dialogProperties;

    return (
        <Dialog onClose={onCloseClickedListener} open={isOpen}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onAcceptClickListener} 
                    color='primary' 
                    variant='outlined'
                    aria-label='Aceptar'
                >
                    Aceptar
                </Button>
                <Button 
                    onClick={onCloseClickedListener} 
                    color='secondary' 
                    variant='outlined'
                    aria-label='Cancelar'
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );

};