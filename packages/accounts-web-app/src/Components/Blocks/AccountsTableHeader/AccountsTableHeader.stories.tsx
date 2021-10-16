import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { Table } from '@mui/material';
import { AccountsTableHeader } from './AccountsTableHeader';

export default {
  title: 'Components/Blocks/AccountsTableHeader',
  component: AccountsTableHeader,
  decorators: [
    (Story) => (
      <Table>
        <thead>
          <Story />
        </thead>
      </Table>
    ),
  ],
} as Meta;

const Template: Story = () => <AccountsTableHeader />;

export const Primary = Template.bind({});
