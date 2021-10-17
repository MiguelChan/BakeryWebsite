import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import { AccountType } from '@mgl/shared-components';
import {
  EditableAccountForm,
  EditableAccountFormProps,
} from './EditableAccountForm';

export default {
  title: 'Components/Constructed/EditableAccountForm',
  component: EditableAccountForm,
  argTypes: {
    onSubmitAccount: {
      defaultValue: 'onSubmitAccount',
      description: 'onSubmitAccount',
      name: 'onSubmitAccount',
    },
  },
} as Meta;

const Template: Story<EditableAccountFormProps> = (args) => <EditableAccountForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  readOnly: false,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
  account: {
    title: 'A Title',
    accountType: AccountType.Entry,
    subAccounts: [
      {
        description: 'One SubAccount',
      },
      {
        description: 'Two subAccounts',
      },
    ],
  },
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  readOnly: false,
  account: {
    title: 'A Title',
    accountType: AccountType.Entry,
    subAccounts: [
      {
        description: 'One SubAccount',
      },
      {
        description: 'Two subAccounts',
      },
    ],
  },
};
