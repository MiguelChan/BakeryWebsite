import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  CreateAccountForm,
  CreateAccountFormProps,
} from './CreateAccountForm';

export default {
  title: 'Components/Constructed/CreateAccountForm',
  component: CreateAccountForm,
  argTypes: {
    onSubmitAccount: {
      defaultValue: 'onSubmitAccount',
      description: 'onSubmitAccount',
      name: 'onSubmitAccount',
    }
  },
} as Meta;

const Template: Story<CreateAccountFormProps> = (args) => <CreateAccountForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
