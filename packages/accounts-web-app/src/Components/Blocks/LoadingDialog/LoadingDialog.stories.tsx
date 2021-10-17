import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  LoadingDialog,
  LoadingDialogProps,
} from './LoadingDialog';

export default {
  title: 'Components/Blocks/LoadingDialog',
  component: LoadingDialog,
} as Meta;

const Template: Story<LoadingDialogProps> = (props) => <LoadingDialog {...props} />;

export const Primary = Template.bind({});
Primary.args = {

};
