import {
  SubAccount,
} from '@mgl/shared-components';
import { Table } from '@mui/material';
import React from 'react';
import { RenderProp } from '../../../Utils';
import { SubAccountsTableHeader } from '../../Blocks/SubAccountsTableHeader/SubAccountsTableHeader';

export interface TableBodyProps {
  subAccounts: SubAccount[];
}

export interface SubAccountsTableProps {
  subAccounts: SubAccount[];
  tableBody: RenderProp<TableBodyProps>;
}

export const SubAccountsTable: React.FunctionComponent<SubAccountsTableProps> = ({
  subAccounts,
  tableBody,
}) => {
  const [currentSubAccounts, setCurrentSubACcounts] = React.useState<SubAccount[]>(subAccounts);

  React.useEffect(() => {
    setCurrentSubACcounts(subAccounts);
  }, [subAccounts]);

  return (
    <Table>
      <SubAccountsTableHeader />
      {tableBody({ subAccounts: currentSubAccounts })}
    </Table>
  );
};
