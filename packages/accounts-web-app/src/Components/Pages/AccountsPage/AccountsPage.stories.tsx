import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  AccountsPage,
} from './AccountsPage';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/Pages/AccountsPage',
  component: AccountsPage,
} as Meta;

const Template: Story = (args) => <AccountsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};