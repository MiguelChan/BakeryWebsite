import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  Table,
  TableBody,
} from '@mui/material';
import {
  EditableSubAccountRow,
  EditableSubAccountRowProps,
} from './EditableSubAccountRow';

export default {
  title: 'Components/Blocks/EditableSubAccountRow',
  component: EditableSubAccountRow,
  decorators: [
    (Story) => (
      <Table>
        <TableBody>
          <Story />
        </TableBody>
      </Table>
    ),
  ],
  argTypes: {
    onDeleteSubAccountClickListener: {
      defaultValue: 'onDeleteSubAccountClickListener',
      description: 'onDeleteSubAccountClickListener',
      name: 'onDeleteSubAccountClickListener',
    },
    onSubAccountUpdatedListener: {
      defaultValue: 'onSubAccountUpdatedListener',
      description: 'onSubAccountUpdatedListener',
      name: 'onSubAccountUpdatedListener',
    },
  },
} as Meta;

const Template: Story<EditableSubAccountRowProps> = (args) => <EditableSubAccountRow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  subAccount: {
    id: 'AnId',
    description: 'A description',
  },
  onSubAccountUpdatedListener: (): void => {},
  readOnly: false,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  subAccount: {
    id: 'AnId',
    description: 'A description',
  },
  onSubAccountUpdatedListener: (): void => {},
  readOnly: true,
};
