import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  SubAccountsTable,
  SubAccountsTableProps,
} from './SubAccountsTable';
import { EditableSubAccountRow } from '../../Blocks/EditableSubAccountRow/EditableSubAccountRow';

export default {
  title: 'Components/Composites/SubAccountsTable',
  component: SubAccountsTable,
} as Meta;

const Template: Story<SubAccountsTableProps> = (props) => <SubAccountsTable {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  subAccounts: [
    {
    },
    {
    },
  ],
  tableBody: (({ subAccounts }) => (
    <TableBody>
      <TableRow>
        <TableCell>
          {`This is the template; an empty one. SubAccounts: ${subAccounts.length}`}
        </TableCell>
      </TableRow>
    </TableBody>
  )),
};

export const WithEditableRows = Template.bind({});
WithEditableRows.args = {
  subAccounts: [
    {
    },
  ],
  tableBody: (({ subAccounts }) => {
    const renderSubAccounts = (): React.ReactElement[] => subAccounts.map((currentSubAccount, index) => (
      <EditableSubAccountRow
        key={`${index}`}
        onDeleteSubAccountClickListener={(): void => {}}
        subAccount={currentSubAccount}
        onSubAccountUpdatedListener={(): void => {}}
        readOnly={false}
      />
    ));

    return (
      <TableBody>
        {renderSubAccounts()}
      </TableBody>
    );
  }),
};
