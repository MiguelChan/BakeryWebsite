import {
  SubAccount,
} from '@mgl/shared-components';
import React from 'react';
import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import {
  Delete,
} from '@mui/icons-material';
import { OnSubAccountUpdatedListener } from '../../../Utils';

export type OnDeleteSubAccountClickListener = (subAccountToDelete: SubAccount) => void;

export interface EditableSubAccountRowProps {
  onDeleteSubAccountClickListener: OnDeleteSubAccountClickListener;
  onSubAccountUpdatedListener: OnSubAccountUpdatedListener;
  subAccount: SubAccount;
}

export const DELETE_BUTTON = 'DeleteButton';
export const TEXT_FIELD = 'ATextField';

/**
 * Defines the EditableSubAccount Row.
 *
 * @param {SubAccount} subAccount The SubAccount to init data with.
 * @param {OnSubAccountUpdatedListener} onSubAccountUpdatedListener Called when the SubAccounts gets updated.
 * @param {OnDeleteSubAccountClickListener} onDeleteSubAccountClickListener Called when a deletion of the objec
 * gets requested.
 *
 * @returns .
 */
export const EditableSubAccountRow: React.FunctionComponent<EditableSubAccountRowProps> = ({
  subAccount,
  onSubAccountUpdatedListener,
  onDeleteSubAccountClickListener,
}) => {
  const onDeleteClickListener = (): void => {
    onDeleteSubAccountClickListener(subAccount);
  };

  const onSubAccountDescriptionUpdated = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    onSubAccountUpdatedListener({
      ...subAccount,
      description: newValue,
    });
  };

  return (
    <TableRow>
      <TableCell />
      <TableCell>
        <TextField
          id="description"
          name="description"
          label="Descripcion Subcuenta"
          fullWidth
          value={subAccount.description}
          onChange={onSubAccountDescriptionUpdated}
          inputProps={{
            "data-testid": TEXT_FIELD,
          }}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="primary"
          aria-label="delete-subaccount"
          component="span"
          onClick={onDeleteClickListener}
          data-testid={DELETE_BUTTON}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
