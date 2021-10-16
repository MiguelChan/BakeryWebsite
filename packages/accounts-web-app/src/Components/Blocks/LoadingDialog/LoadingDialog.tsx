import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import React from 'react';

export interface LoadingDialogProps {
  onClose: () => void;
}

export const LoadingDialog: React.FunctionComponent<LoadingDialogProps> = ({
  onClose,
}) => (
  <Dialog
    open
    onClose={onClose}
  >
    <DialogContent>
      <CircularProgress color='primary' />
    </DialogContent>
  </Dialog>
);