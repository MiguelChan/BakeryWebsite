import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountsTableHeader } from './AccountsTableHeader';
import { Table } from '@mui/material';

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
