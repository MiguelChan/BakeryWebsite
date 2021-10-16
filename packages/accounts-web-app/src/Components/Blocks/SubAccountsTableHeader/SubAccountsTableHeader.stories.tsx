import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { Table } from '@mui/material';
import {
  SubAccountsTableHeader,
} from './SubAccountsTableHeader';

export default {
  title: 'Components/Blocks/SubAccountsTableHeader',
  component: SubAccountsTableHeader,
  decorators: [
    (Story) => (
      <Table>
        <Story />
      </Table>
    ),
  ],
} as Meta;

const Template: Story = () => <SubAccountsTableHeader />;

export const Primary = Template.bind({});
Primary.args = {
};
