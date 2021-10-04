import { 
    CircularProgress, 
    Dialog, 
    DialogContent,
} from '@mui/material';
import * as React from 'react';

interface Properties {
    isOpen: boolean;
}

/**
 * A simple loading dialog.
 * @param {boolean} isOpen Whether the modal is open or not.
 * @returns 
 */
export const LoadingDialog: React.FunctionComponent<Properties> = ({
    isOpen,
}) => 
(
    <Dialog open={isOpen}>
        <DialogContent>
            <CircularProgress />
        </DialogContent>
    </Dialog>
);