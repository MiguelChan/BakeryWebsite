import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  SimpleBlock,
} from './SimpleBlock';

export default {
  title: 'Components/Blocks/SimpleBlock',
  component: SimpleBlock,
} as Meta;

const Template: Story = (args) => <SimpleBlock {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};